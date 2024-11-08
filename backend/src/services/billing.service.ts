import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import config from '../config';
import { NotificationService } from './notification.service';

const prisma = new PrismaClient();
const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2023-10-16'
});

export class BillingService {
  constructor(private notificationService: NotificationService) {}

  async createCustomer(organizationId: string, email: string, name: string) {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        organizationId
      }
    });

    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        subscription: {
          create: {
            stripeCustomerId: customer.id,
            status: 'ACTIVE'
          }
        }
      }
    });

    return customer;
  }

  async createSubscription(organizationId: string, priceId: string) {
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: { subscription: true }
    });

    if (!organization?.subscription?.stripeCustomerId) {
      throw new Error('No customer ID found');
    }

    const subscription = await stripe.subscriptions.create({
      customer: organization.subscription.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });

    await prisma.subscription.update({
      where: { orgId: organizationId },
      data: {
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000)
      }
    });

    return subscription;
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const organizationId = await this.getOrganizationId(subscription.customer as string);
        
        await this.updateSubscriptionStatus(
          organizationId,
          subscription.status,
          new Date(subscription.current_period_end * 1000)
        );
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const organizationId = await this.getOrganizationId(invoice.customer as string);
        
        await this.notificationService.notifyTeam(
          organizationId,
          'payment_success',
          { amount: invoice.amount_paid }
        );
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const organizationId = await this.getOrganizationId(invoice.customer as string);
        
        await this.notificationService.notifyTeam(
          organizationId,
          'payment_failed',
          { amount: invoice.amount_due }
        );
        break;
      }
    }
  }

  private async getOrganizationId(stripeCustomerId: string) {
    const subscription = await prisma.subscription.findFirst({
      where: { stripeCustomerId }
    });
    return subscription?.orgId;
  }

  private async updateSubscriptionStatus(
    organizationId: string,
    status: string,
    currentPeriodEnd: Date
  ) {
    await prisma.subscription.update({
      where: { orgId: organizationId },
      data: {
        status: this.mapStripeStatus(status),
        currentPeriodEnd
      }
    });
  }

  private mapStripeStatus(stripeStatus: string): 'ACTIVE' | 'PAST_DUE' | 'CANCELLED' | 'UNPAID' {
    switch (stripeStatus) {
      case 'active':
        return 'ACTIVE';
      case 'past_due':
        return 'PAST_DUE';
      case 'canceled':
        return 'CANCELLED';
      case 'unpaid':
        return 'UNPAID';
      default:
        return 'ACTIVE';
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { BillingService } from '../services/billing.service';
import { NotificationService } from '../services/notification.service';
import { AppError } from '../middleware/errorHandler';
import config from '../config';
import Stripe from 'stripe';

const billingService = new BillingService(new NotificationService());
const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2023-10-16'
});

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { priceId } = req.body;
    const subscription = await billingService.createSubscription(
      req.user!.organizationId,
      priceId
    );

    res.json({
      success: true,
      data: {
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      req.params.subscriptionId
    );

    res.json({
      success: true,
      data: {
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end
      }
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscription = await stripe.subscriptions.update(
      req.params.subscriptionId,
      { cancel_at_period_end: true }
    );

    res.json({
      success: true,
      data: {
        status: subscription.status,
        cancelAt: subscription.cancel_at
      }
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sig = req.headers['stripe-signature'];

  try {
    if (!sig) {
      throw new AppError(400, 'No Stripe signature found');
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripeWebhookSecret
    );

    await billingService.handleWebhook(event);
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};
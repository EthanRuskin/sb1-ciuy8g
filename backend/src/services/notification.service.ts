import { PrismaClient } from '@prisma/client';
import { createTransport } from 'nodemailer';
import config from '../config';
import { redis } from '../lib/redis';

const prisma = new PrismaClient();
const mailer = createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPassword
  }
});

export class NotificationService {
  private async getUserNotificationSettings(userId: string) {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
      select: { notifications: true }
    });
    return settings?.notifications || {};
  }

  private async getTeamMembers(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        team: {
          include: {
            members: true
          }
        }
      }
    });

    return user?.team?.members || [];
  }

  async notifyUser(userId: string, type: string, data: any) {
    const settings = await this.getUserNotificationSettings(userId);
    
    if (settings[type]) {
      // Store notification in Redis for real-time delivery
      await redis.publish('notifications', JSON.stringify({
        userId,
        type,
        data
      }));

      // Send email if enabled
      if (settings.emailNotifications) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.email) {
          await this.sendEmail(user.email, type, data);
        }
      }
    }
  }

  async notifyTeam(userId: string, type: string, data: any) {
    const teamMembers = await this.getTeamMembers(userId);
    
    for (const member of teamMembers) {
      await this.notifyUser(member.id, type, data);
    }
  }

  private async sendEmail(to: string, type: string, data: any) {
    const templates: Record<string, { subject: string; body: string }> = {
      new_call: {
        subject: 'New Call Recording Available',
        body: `A new call with ${data.customerName} has been recorded.`
      },
      missed_call: {
        subject: 'Missed Call Alert',
        body: `You missed a call from ${data.customerName}.`
      },
      performance_alert: {
        subject: 'Performance Alert',
        body: `Your performance metrics have changed: ${data.message}`
      }
    };

    const template = templates[type];
    if (!template) return;

    await mailer.sendMail({
      from: config.emailFrom,
      to,
      subject: template.subject,
      text: template.body,
      html: `<p>${template.body}</p>`
    });
  }
}
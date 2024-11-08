import { PrismaClient } from '@prisma/client';
import { SentimentAnalysisService } from './sentiment.service';
import { NotificationService } from './notification.service';
import { redis } from '../lib/redis';

const prisma = new PrismaClient();

export class MonitoringService {
  constructor(
    private sentimentService: SentimentAnalysisService,
    private notificationService: NotificationService
  ) {}

  async startMonitoring(callId: string) {
    await prisma.call.update({
      where: { id: callId },
      data: { status: 'IN_PROGRESS' }
    });

    // Subscribe to call events in Redis
    const subscriber = redis.duplicate();
    await subscriber.subscribe(`call:${callId}`);

    subscriber.on('message', async (channel, message) => {
      const data = JSON.parse(message);
      
      if (data.type === 'transcription') {
        const sentiment = await this.sentimentService.analyzeSentiment(data.text);
        
        await prisma.call.update({
          where: { id: callId },
          data: { sentiment }
        });

        // Notify team members about significant sentiment changes
        if (sentiment === 'NEGATIVE') {
          await this.notificationService.notifyTeam(data.userId, 'sentiment_alert', {
            callId,
            sentiment
          });
        }
      }
    });

    return { success: true };
  }

  async stopMonitoring(callId: string) {
    await prisma.call.update({
      where: { id: callId },
      data: { status: 'COMPLETED' }
    });

    // Unsubscribe from Redis channel
    const subscriber = redis.duplicate();
    await subscriber.unsubscribe(`call:${callId}`);

    return { success: true };
  }

  async getCallMetrics(callId: string) {
    const call = await prisma.call.findUnique({
      where: { id: callId },
      include: {
        notes: true
      }
    });

    if (!call) {
      throw new Error('Call not found');
    }

    // Calculate talk ratio
    const transcriptionLines = call.transcription?.split('\n') || [];
    const agentLines = transcriptionLines.filter(line => line.startsWith('Agent:'));
    const customerLines = transcriptionLines.filter(line => line.startsWith('Customer:'));

    const talkRatio = {
      agent: (agentLines.length / transcriptionLines.length) * 100,
      customer: (customerLines.length / transcriptionLines.length) * 100
    };

    return {
      sentiment: call.sentiment,
      talkRatio,
      engagement: this.calculateEngagement(call)
    };
  }

  private calculateEngagement(call: any) {
    // Implement engagement calculation logic based on:
    // - Response times
    // - Question frequency
    // - Interaction patterns
    // This is a simplified example
    const hasQuestions = call.transcription?.includes('?') || false;
    const hasResponses = call.transcription?.length > 0;
    const hasNotes = call.notes.length > 0;

    let engagement = 0;
    if (hasQuestions) engagement += 0.33;
    if (hasResponses) engagement += 0.33;
    if (hasNotes) engagement += 0.34;

    return engagement;
  }
}
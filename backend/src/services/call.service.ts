import { PrismaClient, Call, Note, Tag } from '@prisma/client';
import { SpeechService } from './speech.service';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';

const prisma = new PrismaClient();

export class CallService {
  constructor(
    private speechService: SpeechService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {}

  async createCall(data: {
    userId: string;
    customerName: string;
    duration: number;
    audioBuffer?: Buffer;
  }) {
    let recordingUrl: string | undefined;
    let transcription: string | undefined;

    if (data.audioBuffer) {
      // Upload audio recording
      const filename = `${Date.now()}-${data.userId}.webm`;
      recordingUrl = await this.storageService.uploadFile(
        data.audioBuffer,
        filename,
        'audio/webm'
      );

      // Generate transcription
      transcription = await this.speechService.transcribeAudio(
        data.audioBuffer,
        {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: 'en-US'
        }
      );
    }

    const call = await prisma.call.create({
      data: {
        userId: data.userId,
        customerName: data.customerName,
        duration: data.duration,
        recordingUrl,
        transcription
      }
    });

    // Notify team members
    await this.notificationService.notifyTeam(data.userId, 'new_call', {
      callId: call.id,
      customerName: data.customerName
    });

    return call;
  }

  async getCall(callId: string, userId: string) {
    const call = await prisma.call.findFirst({
      where: {
        id: callId,
        userId
      },
      include: {
        notes: true,
        tags: true
      }
    });

    return call;
  }

  async getCalls(userId: string, filters?: {
    status?: string;
    sentiment?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const calls = await prisma.call.findMany({
      where: {
        userId,
        ...(filters?.status && { status: filters.status }),
        ...(filters?.sentiment && { sentiment: filters.sentiment }),
        ...(filters?.startDate && filters?.endDate && {
          createdAt: {
            gte: filters.startDate,
            lte: filters.endDate
          }
        })
      },
      include: {
        notes: true,
        tags: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return calls;
  }

  async addNote(callId: string, userId: string, content: string) {
    const call = await this.getCall(callId, userId);
    if (!call) {
      throw new Error('Call not found');
    }

    const note = await prisma.note.create({
      data: {
        callId,
        content
      }
    });

    return note;
  }

  async addTag(callId: string, userId: string, tagName: string) {
    const call = await this.getCall(callId, userId);
    if (!call) {
      throw new Error('Call not found');
    }

    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName }
    });

    await prisma.call.update({
      where: { id: callId },
      data: {
        tags: {
          connect: { id: tag.id }
        }
      }
    });

    return tag;
  }

  async deleteCall(callId: string, userId: string) {
    const call = await this.getCall(callId, userId);
    if (!call) {
      throw new Error('Call not found');
    }

    if (call.recordingUrl) {
      await this.storageService.deleteFile(call.recordingUrl);
    }

    await prisma.call.delete({
      where: { id: callId }
    });
  }
}
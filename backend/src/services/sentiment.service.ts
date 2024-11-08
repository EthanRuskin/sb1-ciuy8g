import { Language } from '@google-cloud/language';
import config from '../config';

export class SentimentAnalysisService {
  private client: Language;

  constructor() {
    this.client = new Language({
      projectId: config.googleCloudProjectId,
      keyFilename: config.googleApplicationCredentials
    });
  }

  async analyzeSentiment(text: string): Promise<'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'> {
    try {
      const [result] = await this.client.analyzeSentiment({
        document: {
          content: text,
          type: 'PLAIN_TEXT'
        }
      });

      const sentiment = result.documentSentiment;

      if (!sentiment) {
        return 'NEUTRAL';
      }

      if (sentiment.score >= 0.25) {
        return 'POSITIVE';
      } else if (sentiment.score <= -0.25) {
        return 'NEGATIVE';
      } else {
        return 'NEUTRAL';
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return 'NEUTRAL';
    }
  }

  async analyzeEntities(text: string) {
    const [result] = await this.client.analyzeEntities({
      document: {
        content: text,
        type: 'PLAIN_TEXT'
      }
    });

    return result.entities;
  }

  async analyzeEntitySentiment(text: string) {
    const [result] = await this.client.analyzeEntitySentiment({
      document: {
        content: text,
        type: 'PLAIN_TEXT'
      }
    });

    return result.entities;
  }
}
import { SpeechClient } from '@google-cloud/speech';
import { Storage } from '@google-cloud/storage';
import { logger } from '../utils/logger';
import { config } from '../config';

export class SpeechService {
  private speechClient: SpeechClient;
  private storage: Storage;

  constructor() {
    this.speechClient = new SpeechClient();
    this.storage = new Storage();
  }

  async transcribeAudio(audioBuffer: Buffer, config: {
    encoding: string;
    sampleRateHertz: number;
    languageCode: string;
  }): Promise<string> {
    try {
      const audio = {
        content: audioBuffer.toString('base64'),
      };

      const request = {
        audio,
        config: {
          encoding: config.encoding,
          sampleRateHertz: config.sampleRateHertz,
          languageCode: config.languageCode,
          enableAutomaticPunctuation: true,
          model: 'latest_long',
          useEnhanced: true,
        },
      };

      const [response] = await this.speechClient.recognize(request);
      const transcription = response.results
        ?.map(result => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join('\n');

      return transcription || '';
    } catch (error) {
      logger.error('Error transcribing audio:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async transcribeLongAudio(gcsUri: string, config: {
    encoding: string;
    sampleRateHertz: number;
    languageCode: string;
  }): Promise<string> {
    try {
      const audio = {
        uri: gcsUri,
      };

      const request = {
        audio,
        config: {
          encoding: config.encoding,
          sampleRateHertz: config.sampleRateHertz,
          languageCode: config.languageCode,
          enableAutomaticPunctuation: true,
          model: 'latest_long',
          useEnhanced: true,
        },
      };

      const [operation] = await this.speechClient.longRunningRecognize(request);
      const [response] = await operation.promise();

      const transcription = response.results
        ?.map(result => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join('\n');

      return transcription || '';
    } catch (error) {
      logger.error('Error transcribing long audio:', error);
      throw new Error('Failed to transcribe long audio');
    }
  }

  async uploadAudioToGCS(audioBuffer: Buffer, filename: string): Promise<string> {
    try {
      const bucket = this.storage.bucket(`${config.googleCloudProjectId}-audio`);
      const file = bucket.file(filename);
      
      await file.save(audioBuffer);
      
      return `gs://${bucket.name}/${filename}`;
    } catch (error) {
      logger.error('Error uploading audio to GCS:', error);
      throw new Error('Failed to upload audio to Google Cloud Storage');
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { SpeechService } from '../services/speech.service';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const speechService = new SpeechService();

export const transcribeAudio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError(400, 'No audio file provided');
    }

    const audioConfig = {
      encoding: req.body.encoding || 'LINEAR16',
      sampleRateHertz: parseInt(req.body.sampleRate, 10) || 16000,
      languageCode: req.body.languageCode || 'en-US',
    };

    let transcription: string;

    if (req.file.size > 1024 * 1024) { // If file is larger than 1MB
      const gcsUri = await speechService.uploadAudioToGCS(
        req.file.buffer,
        `${Date.now()}-${req.file.originalname}`
      );
      transcription = await speechService.transcribeLongAudio(gcsUri, audioConfig);
    } else {
      transcription = await speechService.transcribeAudio(req.file.buffer, audioConfig);
    }

    res.json({
      success: true,
      data: { transcription }
    });
  } catch (error) {
    logger.error('Transcription error:', error);
    next(error);
  }
};
import { Request, Response, NextFunction } from 'express';
import { CallService } from '../services/call.service';
import { SpeechService } from '../services/speech.service';
import { StorageService } from '../services/storage.service';
import { NotificationService } from '../services/notification.service';
import { AppError } from '../middleware/errorHandler';
import { z } from 'zod';

const callService = new CallService(
  new SpeechService(),
  new StorageService(),
  new NotificationService()
);

const createCallSchema = z.object({
  customerName: z.string(),
  duration: z.number(),
  audioBuffer: z.any().optional()
});

export const createCall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createCallSchema.parse({
      ...req.body,
      audioBuffer: req.file?.buffer
    });

    const call = await callService.createCall({
      userId: req.userId!,
      ...data
    });

    res.status(201).json({
      success: true,
      data: { call }
    });
  } catch (error) {
    next(error);
  }
};

export const getCalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, sentiment, startDate, endDate } = req.query;

    const calls = await callService.getCalls(req.userId!, {
      status: status as string,
      sentiment: sentiment as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined
    });

    res.json({
      success: true,
      data: { calls }
    });
  } catch (error) {
    next(error);
  }
};

export const getCall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const call = await callService.getCall(req.params.id, req.userId!);

    if (!call) {
      throw new AppError(404, 'Call not found');
    }

    res.json({
      success: true,
      data: { call }
    });
  } catch (error) {
    next(error);
  }
};

export const addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const note = await callService.addNote(
      req.params.id,
      req.userId!,
      req.body.content
    );

    res.status(201).json({
      success: true,
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

export const addTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tag = await callService.addTag(
      req.params.id,
      req.userId!,
      req.body.name
    );

    res.status(201).json({
      success: true,
      data: { tag }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await callService.deleteCall(req.params.id, req.userId!);

    res.json({
      success: true,
      message: 'Call deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
import { Router } from 'express';
import multer from 'multer';
import { transcribeAudio } from '../controllers/transcription.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

router.post(
  '/transcribe',
  authenticate,
  upload.single('audio'),
  transcribeAudio
);

export const transcriptionRoutes = router;
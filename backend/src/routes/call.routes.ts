import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createCall,
  getCalls,
  getCall,
  updateCall
} from '../controllers/call.controller';

const router = Router();

router.use(authenticate);

router.route('/')
  .post(createCall)
  .get(getCalls);

router.route('/:id')
  .get(getCall)
  .patch(updateCall);

export const callRoutes = router;
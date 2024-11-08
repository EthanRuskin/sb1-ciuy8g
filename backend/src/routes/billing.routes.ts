import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createSubscription,
  getSubscriptionStatus,
  cancelSubscription,
  handleWebhook
} from '../controllers/billing.controller';

const router = Router();

router.post('/webhook', handleWebhook);

router.use(authenticate);

router.post('/subscriptions', createSubscription);
router.get('/subscriptions/:subscriptionId', getSubscriptionStatus);
router.post('/subscriptions/:subscriptionId/cancel', cancelSubscription);

export const billingRoutes = router;
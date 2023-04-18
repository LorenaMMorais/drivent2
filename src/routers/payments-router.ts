import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserPayment, postUserPayment } from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas';

export const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/', getUserPayment)
  .post('/process', validateBody(paymentSchema), postUserPayment);

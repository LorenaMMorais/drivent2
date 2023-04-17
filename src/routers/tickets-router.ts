import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getUserTicket, getTicketType, postUserTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getUserTicket)
  .get('/types', getTicketType)
  .post('/', validateBody(createTicketSchema), postUserTicket);

export { ticketsRouter };

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketType(req: Request, res: Response) {
  try {
    const ticketType = await ticketsService.getAllTicketsTypes();

    res.send(ticketType).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const ticket = await ticketsService.getUserTicket(userId);

    res.send(ticket).status(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;

  try {
    const insertTicket = await ticketsService.postTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(insertTicket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

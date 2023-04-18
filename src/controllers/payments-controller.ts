import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { PaymentInput, PaymentType } from '@/protocols';
import paymentServices from '@/services/payments-service';
import { badRequestError } from '@/errors/bad-request-error';

export async function getUserPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string | undefined;
  const userId = req.userId;

  try {
    if (!ticketId) {
      throw badRequestError();
    }

    const newPayment = await paymentServices.findPayment(Number(ticketId), userId);

    return res.status(httpStatus.OK).send(newPayment);
  } catch (error) {
    if (error.name === 'BadRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function postUserPayment(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const payment = req.body as PaymentType;
  const paymentInput = req.body as PaymentInput;

  try {
    const insertPayment = await paymentServices.postPayment(payment, paymentInput, userId);

    return res.status(httpStatus.OK).send(insertPayment);
  } catch (error) {
    if (error.name === 'badRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

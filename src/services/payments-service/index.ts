import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/ticktes-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { PaymentInput, PaymentType } from '@/protocols';
import { notFoundError, unauthorizedError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';

export async function findPayment(ticketId: number, userId: number) {
  const user = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!user) throw notFoundError();

  const ticketById = await ticketsRepository.getTicketById(ticketId);

  if (!ticketById) throw notFoundError();

  if (ticketById.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentsRepository.getPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

export async function postPayment(paymentData: PaymentType, paymentDataInput: PaymentInput, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticketById = await ticketsRepository.getUserTicketById(paymentData.ticketId);

  if (!ticketById) throw notFoundError();

  if (ticketById.enrollmentId !== userId) throw unauthorizedError();

  if (!paymentData.ticketId) throw badRequestError();

  if (!paymentData) throw badRequestError();

  const ticketType = await ticketsRepository.getTicketTypeById(ticketById.ticketTypeId);

  await ticketsRepository.updateTicket(paymentData.ticketId);

  const body = {
    ticketId: paymentData.ticketId,
    value: ticketType.price,
    cardIssuer: paymentDataInput.cardData.issuer,
    cardLastDigits: paymentDataInput.cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(body);

  return payment;
}

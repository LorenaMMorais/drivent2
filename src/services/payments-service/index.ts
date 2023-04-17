import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/ticktes-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { PaymentType } from '@/protocols';
import { notFoundError, unauthorizedError } from '@/errors';

export async function findPayment(ticketId: number, userId: number) {
  const user = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!user) throw notFoundError();

  const ticket = await ticketsRepository.getUserTicketById(ticketId);

  if (!ticket) throw unauthorizedError();

  const payment = await paymentsRepository.getPayment(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

export async function postPayment(paymentData: PaymentType, userId: number) {
  const ticketById = await ticketsRepository.getUserTicketById(paymentData.ticketId);

  if (!ticketById) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollment) throw notFoundError();

  await ticketsRepository.updateTicket(paymentData.ticketId);

  const payment = await paymentsRepository.createPayment(paymentData);

  return payment;
}

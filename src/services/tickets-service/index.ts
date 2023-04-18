import ticketsRepository from '@/repositories/ticktes-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';

export async function getAllTicketsTypes() {
  const result = await ticketsRepository.getTicketsType();

  return result;
}

async function getUserTicket(userId: number) {
  const result = await ticketsRepository.getUserTicketById(userId);

  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const result = await enrollmentRepository.findByUserId(userId);

  if (!result) {
    throw notFoundError();
  }
  if (!ticketTypeId) {
    throw badRequestError();
  }

  const response = await ticketsRepository.createTicket(ticketTypeId, result.id);

  return response;
}

const ticketsService = {
  getAllTicketsTypes,
  getUserTicket,
  postTicket,
};

export default ticketsService;

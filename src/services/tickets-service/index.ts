import ticketsRepository from '@/repositories/ticktes-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

async function getAllTicketsTypes() {
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
  const result = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!result) {
    throw notFoundError();
  }

  return await ticketsRepository.createTicket(ticketTypeId, result.id);
}

const ticketsService = {
  getAllTicketsTypes,
  getUserTicket,
  postTicket,
};

export default ticketsService;

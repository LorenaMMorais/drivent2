import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketsType() {
  return await prisma.ticketType.findMany();
}

async function getUserTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: id,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return await prisma.ticket.create({
    data: {
      ticketTypeId,
      status: TicketStatus.RESERVED,
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  getTicketsType,
  getUserTicketById,
  createTicket,
};

export default ticketsRepository;

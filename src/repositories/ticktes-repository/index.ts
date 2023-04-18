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
      Enrollment: true,
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

async function updateTicket(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

async function getTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function getTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
    select: {
      price: true,
    },
  });
}

const ticketsRepository = {
  getTicketsType,
  getUserTicketById,
  createTicket,
  updateTicket,
  getTicketById,
  getTicketTypeById,
};

export default ticketsRepository;

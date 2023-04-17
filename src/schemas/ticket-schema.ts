import joi from 'joi';

const createTicketSchema = joi.object({
  ticketTypeId: joi.number().required(),
});

export default createTicketSchema;

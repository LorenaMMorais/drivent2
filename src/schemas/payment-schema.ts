import joi from 'joi';
import { PaymentInput } from '@/protocols';

export const paymentSchema = joi.object<PaymentInput>({
  ticketId: joi.number().required(),
  cardData: joi
    .object({
      issuer: joi.string().required(),
      number: joi.string().required(),
      name: joi.string().required(),
      expirationDate: joi.string().required(),
      cvv: joi.string().required,
    })
    .required(),
});

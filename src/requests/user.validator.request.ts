import { Request } from 'express';
import Joi from 'joi';
export const userRequest = (req: Request): any => {
  const schema = Joi.object().keys({
    document: Joi.string().required().max(11),
  });

  if (schema.validate(req.body).error) {
    return schema.validate(req.body).error?.message;
  }
  return null;
};

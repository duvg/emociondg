import { Request } from 'express';
import Joi from 'joi';
export const emotionRequest = (req: Request): any => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    name: Joi.string().required().max(100),
    description: Joi.string().required().max(200),
    bodyPart: Joi.string().required().max(100),
  });

  if (schema.validate(req.body).error) {
    return schema.validate(req.body).error?.message;
  }
  return null;
};

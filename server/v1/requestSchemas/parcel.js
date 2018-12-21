import Joi from 'joi';

const currentLocation = Joi.string().min(10).max(100).required();
const to = Joi.string().min(10).max(100).required();
const from = Joi.string().min(10).max(100).required();
const status = Joi.string().min(5).max(100).required();
const description = Joi.string().min(10).max(200);
const contactPhone = Joi.string().min(8).max(20);
const contactEmail = Joi.string().strict().trim().strict()
  .min(10)
  .max(100)
  .email();

const weight = Joi.number().positive().min(1).max(100)
  .precision(2)
  .required();
const slug = Joi.string().min(10).max(100);
const presentMapPointer = Joi.string().min(1);

const parcelCreateSchema = {
  currentLocation,
  to,
  slug,
  from,
  weight,
  description,
  presentMapPointer,
  contactEmail,
  contactPhone
};

const changeDestinationSchema = {
  to,
};

const changeStatusSchema = {
  status,
};

const changeLocationSchema = {
  currentLocation,
};

export {
  parcelCreateSchema,
  changeDestinationSchema,
  changeStatusSchema,
  changeLocationSchema,
};

import Joi from 'joi';

const currentLocation = Joi.string().min(10).max(100).required();
const to = Joi.string().min(10).max(100).required();
const from = Joi.string().min(10).max(100).required();
const status = Joi.string().min(5).max(100).required();
const description = Joi.string().min(10).max(200);
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

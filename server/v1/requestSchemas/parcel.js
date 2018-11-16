import Joi from 'joi';

const deliveryLocation = Joi.string().min(1).required();
const presentLocation = Joi.string().min(1).required();
const pickupLocation = Joi.string().min(1).required();
const status = Joi.string().min(1).required();
const description = Joi.string().min(1);
const presentMapPointer = Joi.string().min(1);

const parcelCreateSchema = {
  deliveryLocation,
  presentLocation,
  pickupLocation,
  description,
  presentMapPointer,
};

const changeDestinationSchema = {
  deliveryLocation,
};

const changeStatusSchema = {
  status,
};

const changePresentLocationSchema = {
  presentLocation,
};

export {
  parcelCreateSchema,
  changeDestinationSchema,
  changeStatusSchema,
  changePresentLocationSchema,
};

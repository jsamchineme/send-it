import Joi from 'joi';

const deliveryLocation = Joi.string().min(1).required();
const presentLocation = Joi.string().min(1).required();
const pickupLocation = Joi.string().min(1).required();


const parcelCreateSchema = {
  deliveryLocation,
  presentLocation,
  pickupLocation,
};

const changeDestinationSchema = {
  deliveryLocation,
};

const schemas = {
  parcelCreateSchema,
  changeDestinationSchema,
};

export default schemas;

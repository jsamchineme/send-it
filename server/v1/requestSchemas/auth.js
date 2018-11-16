import Joi from 'joi';

const email = Joi.string().email().min(1).required();
const password = Joi.string().min(1).required();
const username = Joi.string().min(1).required();

const signupSchema = {
  email,
  password,
  username,
};

const loginSchema = {
  email,
  password,
};

export { loginSchema, signupSchema };

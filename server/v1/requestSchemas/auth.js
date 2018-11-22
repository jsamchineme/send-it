import Joi from 'joi';

const email = Joi.string().strict().trim().strict()
  .min(10)
  .max(100)
  .email()
  .required();

const password = Joi.string().trim().strict().min(8)
  .max(40)
  .required();
const username = Joi.string().trim().min(8).max(50)
  .required();

const signupRequestSchema = {
  email,
  password,
  username,
};

const loginRequestSchema = {
  email,
  password,
};

export { loginRequestSchema, signupRequestSchema };

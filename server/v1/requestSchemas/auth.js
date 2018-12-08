import Joi from 'joi';

const email = Joi.string().strict().trim().strict()
  .min(10)
  .max(100)
  .email()
  .required();

const password = Joi.string().trim().strict().alphanum()
  .min(8)
  .max(40)
  .required();
const username = Joi.string().trim().min(8).max(50)
  .required();
const firstname = Joi.string().trim().min(3).max(30);
const lastname = Joi.string().trim().min(3).max(30);
const othernames = Joi.string().trim().min(3).max(30);

const signupRequestSchema = {
  email,
  firstname,
  lastname,
  othernames,
  password,
  username,
};

const loginRequestSchema = {
  email,
  password,
};

export { loginRequestSchema, signupRequestSchema };

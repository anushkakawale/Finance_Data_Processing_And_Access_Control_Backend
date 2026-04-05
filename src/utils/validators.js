const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'Analyst', 'Viewer').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('Income', 'Expense').required(),
  category: Joi.string().required(),
  date: Joi.date().optional(),
  notes: Joi.string().allow('').optional(),
});

const userUpdateSchema = Joi.object({
  role: Joi.string().valid('Admin', 'Analyst', 'Viewer').optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  transactionSchema,
  userUpdateSchema,
};

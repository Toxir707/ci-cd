import Joi from "joi";

export const registerUser = Joi.object({
    name: Joi.string().min(1).max(50).alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
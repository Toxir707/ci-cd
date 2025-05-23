import Joi from "joi"

export const createCompanySchema = Joi.object({
    name: Joi.string().min(4).max(70).alphanum().required(),
    location: Joi.string().min(5).required(),
    imageUrl: Joi.string()
}).required()

export const updateCompanySchema = Joi.object({
    name: Joi.string().min(4).max(70).alphanum().required(),
    location: Joi.string().min(5).required(),
    imageUrl: Joi.string()
})
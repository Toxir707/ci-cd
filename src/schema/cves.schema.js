import Joi from "joi";

export const createCV = Joi.object({
    title: Joi.string().max(60).alphanum().required(),
    content: Joi.string().max(10000).required(),
    userId: Joi.string().required()
})



export const updateCV = Joi.object({
    title: Joi.string().max(60).alphanum().required(),
    content: Joi.string().max(10000).required(),
    userId: Joi.string().required()
})

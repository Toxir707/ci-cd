import Joi from "joi";

export const createJobSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    salary: Joi.number().min(200).max(10000000).required(),
    companyId: Joi.string().required()
}).required();

export const updateJobSchema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    salary: Joi.number().min(200).max(10000000).required(),
    companyId: Joi.string()
});

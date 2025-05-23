import { isValidObjectId } from "mongoose";
import jobModel from "../model/job.model.js";
import { BaseException } from "../exception/base.exception.js";

import companyModel from "../model/company.model.js";

const getAllJobs = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, orderField = "_id", orderSort = 1, search,companyId } = req.query;

        if (!(Number(limit) && Number(page))) {
            return res.status(400).send({
                message: "Limit and page must be numbers"
            });
        }

        if (limit <= 0 || page <= 0) {
            throw new BaseException("Limit and page must be positive numbers.", 400);
        }

        const possibleFields = ["_id", "name", "createdAt", "updatedAt"];
        const possibleSorts = [1, -1];

        if (!(possibleFields.includes(orderField) && possibleSorts.includes(Number(orderSort)))) {
            throw new BaseException("Invalid sort type or field.", 400);
        }

        let query = {};

        if (search && search.trim() !== '') {
            query.name = { $regex: search.trim(), $options: 'i' }; 
        }

        if(companyId){
            query.companyId = companyId;
        }

        const totalJobs = await jobModel.countDocuments(query);

        const jobs = await jobModel.find(query)
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.render("jobs", {
            data: jobs,
            count: totalJobs,
            limit: Number(limit),
            page: Number(page),
        });

    } catch (error) {
        next(error);
    }
};

const getOneJobs = async (req,res,next) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findById(id);
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
        
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
       next(error)
    }
}

const createJob = async (req, res, next) => {
  try {
    const { name, salary, companyId } = req.body;

    if (!isValidObjectId(companyId)) {
      throw new BaseException("Noto‘g‘ri kompaniya ID", 400);
    }
    
    const company = await companyModel.findById(companyId);
    if (!company) {
      throw new BaseException("Kompaniya topilmadi", 404);
    }

    const job = await jobModel.create({ name, salary, companyId });

    await companyModel.findByIdAndUpdate(companyId, {
      $push: { Jobs: job._id }
    });

    res.status(201).send({
      message: "Ish muvaffaqiyatli yaratildi va kompaniyaga qo‘shildi",
      data: job
    });
  } catch (error) {
    next(error);
  }
};

const updateJobs = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { name,salary,companyId } = req.body;
    
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findByIdAndUpdate(id, { name ,salary,companyId}, { new: true });
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        next(error)
    }
};

const deleteJobs = async (req,res,next) => {
    try {
        const { id } = req.params;

        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };
    
        const job = await jobModel.findByIdAndDelete(id);
    
        if(!job){
            throw new BaseException(`Job with id: ${id} not found`,404);
        };
    
        res.send({
            message: "success",
            data: job
        });
    } catch (error) {
        next(error)
    }
}

export default { getAllJobs, createJob, updateJobs, deleteJobs, getOneJobs }; 

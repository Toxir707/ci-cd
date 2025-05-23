import { BaseException } from "../exception/base.exception.js";
import companyModel from "../model/company.model.js";
import { isValidObjectId } from "mongoose";


const getAllCompanies = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, orderField = "_id", orderSort = 1, search } = req.query;

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
        const company = await companyModel.findOne();
        console.log(company.Jobs); // Check if it's an array of ObjectIds
        

        let query = {};

        if (search && search.trim() !== '') {
            query.name = { $regex: search.trim(), $options: 'i' };
        }

        const totalCompanies = await companyModel.countDocuments(query);

        const companies = await companyModel.find(query)
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate("Jobs");

        res.render("companies", {
            data: companies,
            count: totalCompanies,
            limit: Number(limit),
            page: Number(page),
        })

    } catch (error) {
        next(error);
    }
};


const getCompany = async (req,res,next) => {
    try {
        const id = req.params.id
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const company = await companyModel.findById(id);

        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }

        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const createCompany = async (req,res,next) => {
    try {
        const {name,location} = req.body;    
        const company = await companyModel.create({name,
            location,
            imageUrl: req.file.filename})
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const updateCompany = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const {name,location} = req.body;
        const company = await companyModel.findByIdAndUpdate(id, { name,location }, { new: true });
        
        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }
        res.status(200).send({
            message:"success",
            data:company
        });
    } catch (error) {
        next(error)
    }
};

const deleteCompany = async (req,res,next) => {
    try {
        const id = req.params.id;
        
        if(!(isValidObjectId(id))){
            throw new BaseException(`Given id: ${id} is not valid`,400);
        };

        const company = await companyModel.findByIdAndDelete(id)
        
        if(!company){
            throw new BaseException(`Given company: ${id} is not found`,400)
        }
        res.status(200).send({
            message:"success",
            data:company
        })
    } catch (error) {
        next(error)
    }
};



export default {getAllCompanies,getCompany,createCompany,updateCompany,deleteCompany}
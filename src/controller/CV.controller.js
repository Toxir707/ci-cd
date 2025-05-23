import { isValidObjectId } from "mongoose";
import cvModel from "../model/cv.model.js";
import { BaseException } from "../exception/base.exception.js";

const getAllCVs = async (req, res,next) => {
    try {
        const { limit = 10, page = 1, orderField = "_id", orderSort = 1 } = req.query;

        if (!(Number(limit) && Number(page))) {
            throw new BaseException("limit and page must be numbers",400)
        };

        if (limit <= 0 || page <= 0) {
            throw new BaseException("manfiy son bo'lmasligi kk",400);
        }

        const possibleFields = ["_id", "userId", "title", "createdAt", "updatedAt"];
        const possibleSorts = [1, -1];

        if (!(possibleFields.includes(orderField) && possibleSorts.includes(Number(orderSort)))) {
            throw new BaseException("OrderField yoki orderSortdan bittasi xato",400)
        };

        const totalCVs = await cvModel.countDocuments();

        const cvs = await cvModel.find()
            .sort({ [orderField]: Number(orderSort) })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.send({
            message: "success",
            data: cvs,
            count: totalCVs,
            limit: Number(limit),
            page: Number(page)
        });
    } catch (error) {
        next(error)
    }
};

const getOneCV = async (req, res,next) => {
    try {
        const { id } = req.params

        if (!(isValidObjectId(id))) {
            throw new BaseException(`given id: ${id} is not valid`,400)
        }

        const cv = await cvModel.findById(id);

        if (!cv) {
            throw new BaseException(`CV with id: ${id} not found`,404);
        }

        res.send({
            message: "success",
            data: cv
        });
    } catch (error) {
        next(error)
    }
};

const createCV = async (req, res,next) => {
    try {
        const { userId, title, content } = req.body;

        if (!userId || !title || !content) {
            throw new BaseException("o'zgaruvchilarni hammasi kiritilsin",400);
        }

        const existingCV = await cvModel.findOne({ userId });

        if (existingCV) {
            throw new BaseException(`CV for userId: ${userId} already exist`,409);
        }

        const cv = await cvModel.create({ userId, title, content });

        res.status(201).send({
            message: "success",
            data: cv
        });
    } catch (error) {
        next(error)
    }
};

const updateCV = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!(isValidObjectId(id))) {
            throw new BaseException(`Given id: ${id} is not valid`,400);
        }
        const updatedCV = await cvModel.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updatedCV) {
            throw new BaseException(`CV with id: ${id} not found`,404);
        }

        res.send({
            message: "CV updated successfully",
            data: updatedCV
        });
    } catch (error) {
        next(error)
    }
};

const deleteCV = async (req, res,next) => {
    try {
        const { id } = req.params;

        if (!(isValidObjectId(id))) {
            throw new BaseException(`Given id: ${id} is not valid`,400);
        }
        const deletedCV = await cvModel.findByIdAndDelete(id);
        if (!deletedCV) {
            throw new BaseException(`CV with id: ${id} not found`,404)
        }

        res.send({
            message: "CV deleted successfully",
            data: deletedCV
        });
    } catch (error) {
        next(error)
    }
};

export default { getAllCVs, getOneCV, createCV, updateCV, deleteCV };

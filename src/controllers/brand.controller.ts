import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import BrandModel, { brandDTO } from "../models/brand.model";
import response from "../utils/response";
import { isValidObjectId } from "mongoose";

export default {
    async create(req: IReqUser, res: Response) {
        try {
            await brandDTO.validate(req.body);

            const result = await BrandModel.create(req.body)

            response.success(res, result, 'success create a brand')
        } catch (error) {
            response.error(res, error, 'failed create brand')
        }
    },
    async findAll(req: IReqUser, res: Response) { 
        try {
         const { 
            page = 1, 
            limit = 10, 
            search 
         } = req.query as unknown as IPaginationQuery;
           
         const query = {};

         if(search) {
            Object.assign(query, {
                $or: [
                    {
                        name: {$regex: search, $options: "i"},
                    },
                    {
                        description: {$regex: search, $options: "i"}
                    }
                ]
            })
         }

        const result = await BrandModel.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({createdAt: -1})
            .exec();

        const count = await BrandModel.countDocuments(query);

        response.pagination(res, result, {
            total: count,
            totalPages: Math.ceil(count / limit),
            current: page
        }, 'success find all brand')
        } catch (error) {
            response.error(res, error, 'failed find all brand')
        }
    },
    async findOne(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed find one a brand');
            }

            const result = await BrandModel.findById(id);

             if(!result) {
                return response.notFound(res, 'failed find one a brand');
            }

            response.success(res, result, 'success find one brand')
        } catch (error) {
            response.error(res, error, 'failed find one brand')
        }
    },
    async update(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed update a brand');
            }

            const result = await BrandModel.findByIdAndUpdate(id, req.body, {
                new: true
            });

            response.success(res, result, 'success update brand')
        } catch (error) {
            response.error(res, error, 'failed update brand')
        }
    },
    async remove(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed remove a brand');
            }

            const result = await BrandModel.findByIdAndDelete(id, {
                new: true
            });

            response.success(res, result, 'success remove brand')
        } catch (error) {
            response.error(res, error, 'failed remove brand')
        }
    },
};
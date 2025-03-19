import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import ProductModel, { productDTO, TypeProduct } from "../models/product.model";
import response from "../utils/response";
import { FilterQuery, isValidObjectId } from "mongoose";
import uploader from "../utils/uploader";

export default {
    async create(req: IReqUser, res: Response) {
        try {
            const payload = {...req.body, createdBy: req.user?.id} as TypeProduct;
            await productDTO.validate(payload);
            const result = await ProductModel.create(payload)

            response.success(res, result, 'success create a product')
        } catch (error) {
            response.error(res, error, 'failed create product')
        }
    },
    async findAll(req: IReqUser, res: Response) {
        try {
            const buildQuery = (filter: any) => {
                let query: FilterQuery<TypeProduct> = {};

                if(filter.search) query.$text = { $search: filter.search };
                if(filter.brand) query.brand = filter.brand;
                if(filter.isPublish) query.isPublish = filter.isPublish;
                if(filter.isFeatured) query.isFeatured = filter.isFeatured;

                return query;
            }
            
            const {
                limit = 10,
                page = 1,
                search,
                brand,
                isFeatured,
                isPublish, 
            } = req.query;

            const query = buildQuery({
                search,
                brand,
                isPublish,
                isFeatured,
            });

            const result = await ProductModel.find(query)
                .limit(+limit)
                .skip((+page - 1) * +limit)
                .sort({createdAt: -1})
                .lean()
                .exec();

            const count = await ProductModel.countDocuments(query);

            response.pagination(res, result, {
                total: count,
                totalPages: Math.ceil(count / +limit),
                current: +page
            }, 'success find all product')
        } catch (error) {
            response.error(res, error, 'failed find all product')
        }
    },
    async findOne(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed find one a product');
            }

            const result = await ProductModel.findById(id);

            if(!result) {
                return response.notFound(res, 'failed find one a product');
            }

            response.success(res, result, 'success find one product')
        } catch (error) {
            response.error(res, error, 'failed find one product')
        }
    },
    async update(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed update a product');
            }

            const result = await ProductModel.findByIdAndUpdate(id, req.body, {
                new: true
            });

            if (!result) return response.notFound(res, "product not found");

            response.success(res, result, 'success update product')
        } catch (error) {
            response.error(res, error, 'failed update product')
        }
    },
    async remove(req: IReqUser, res: Response) {
        try {
            const { id } = req.params;

            if(!isValidObjectId(id)) {
                return response.notFound(res, 'failed remove a product');
            }

            const result = await ProductModel.findByIdAndDelete(id, {
                new: true
            });

            if (!result) return response.notFound(res, "product not found");

            await uploader.remove(result.image);

            response.success(res, result, 'success remove product')
        } catch (error) {
            response.error(res, error, 'failed remove product')
        }
    },
    async findOneBySlug(req: IReqUser, res: Response) {
        try {
            const { slug } = req.params;

            const result = await ProductModel.findOne({ slug });

            if (!result) return response.notFound(res, "product not found");

            response.success(res, result, 'success find one by slug product')
        } catch (error) {
            response.error(res, error, 'failed find one by slug product')
        }
    },
};
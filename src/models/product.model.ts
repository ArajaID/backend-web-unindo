import mongoose, { ObjectId } from "mongoose";
import * as Yup from "yup";
import { BRAND_MODEL_NAME } from "./brand.model";
import { USER_MODEL_NAME } from "./user.model";

export const PRODUCT_MODEL_NAME = "Product";

const Schema = mongoose.Schema;

export const productDTO = Yup.object({
    name: Yup.string().required(),
    slug: Yup.string(),
    description: Yup.string().required(),
    image: Yup.string().required(),
    barcode: Yup.string().required(),
    packaging: Yup.string().required(),
    netWeight: Yup.string().required(),
    isFeatured: Yup.boolean().required(),
    isPublish: Yup.boolean(),
    brand: Yup.string().required(),
    createdBy: Yup.string().required(),
    createdAt: Yup.string(),
    updatedAt: Yup.string(),
    licensing: Yup.object().shape({
        isBPOM: Yup.boolean(),
        isHalal: Yup.boolean(),
        isKemenkes: Yup.boolean(),
    }).required()
});

export type TypeProduct = Yup.InferType<typeof productDTO>;

export interface Product extends Omit<TypeProduct, "brand" | "createdBy"> {
    brand: ObjectId;
    createdBy: ObjectId;
}

const ProductSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    slug: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    image: {
        type: Schema.Types.String,
        required: true
    },
    barcode: {
        type: Schema.Types.String,
        required: true
    },
    packaging: {
        type: Schema.Types.String,
        required: true
    },
    netWeight: {
        type: Schema.Types.String,
        required: true
    },
    isFeatured: {
        type: Schema.Types.Boolean,
        required: true
    },
    isPublish: {
        type: Schema.Types.Boolean,
        default: false
    },
    brand: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: BRAND_MODEL_NAME
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL_NAME
    },
    licensing: {
       type: {
           isBPOM: {
             type: Schema.Types.Boolean,
           },
           isHalal: {
            type: Schema.Types.Boolean,
           },
           isKemenkes: {
            type: Schema.Types.Boolean,
          },
       }
    }
}, {
    timestamps: true
}).index({ name: "text" });

ProductSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = this.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    next();
});

const ProductModel = mongoose.model(PRODUCT_MODEL_NAME, ProductSchema);

export default ProductModel;

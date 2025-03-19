import mongoose from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

export const BRAND_MODEL_NAME = "Brand";

export const brandDTO = Yup.object({
    name: Yup.string().required(),
    icon: Yup.string().required(),
    isShow: Yup.boolean().required(),
});

export type Brand = Yup.InferType<typeof brandDTO>;

const BrandSchema = new Schema<Brand>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    icon: {
        type: Schema.Types.String,
        required: true,
    },
    isShow: {
        type: Schema.Types.Boolean,
        required: true,
    },
}, {
    timestamps: true
});

const BrandModel = mongoose.model(BRAND_MODEL_NAME, BrandSchema);

export default BrandModel;
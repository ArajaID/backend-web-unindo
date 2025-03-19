import express from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import aclMiddleware from '../middlewares/acl.middleware';
import { ROLES } from '../utils/constant';
import mediaMiddleware from '../middlewares/media.middleware';
import mediaController from '../controllers/media.controller';
import brandController from '../controllers/brand.controller';
import bannerController from '../controllers/banner.controller';
import productController from '../controllers/product.controller';

const router = express.Router();

router.post('/auth/register', authController.register
    /*
        #swagger.tags = ['Auth']
    */
);
router.post('/auth/login', authController.login
    /*
        #swagger.tags = ['Auth']
        #swagger.requestBody = { 
            required: true,
            schema: { $ref: "#/components/schemas/LoginRequest" }
        }
    */
);
router.get('/auth/me', authMiddleware, authController.me
     /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
);
router.post('/auth/activation', authController.activation
    /*
        #swagger.tags = ['Auth']
        #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/ActivationRequest" }
        }
    */
);
router.put(
    "/auth/update-profile",
    [authMiddleware, aclMiddleware([ROLES.STAFF])],
    authController.updateProfile
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
        "bearerAuth": {}
        }]
        #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/UpdateProfileRequest"
        }
        }
    */
);
router.put(
    "/auth/update-password",
    [authMiddleware, aclMiddleware([ROLES.STAFF])],
    authController.updatePassword
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
        "bearerAuth": {}
        }]
        #swagger.requestBody = {
        required: true,
        schema: {
            $ref: "#/components/schemas/UpdatePasswordRequest"
        }
        }
    */
);

router.post('/banners', [authMiddleware, aclMiddleware([ROLES.ADMIN])], bannerController.create
    /*
        #swagger.tags = ['Banners']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateBannerRequest"
            }
        }
    */
);
router.get('/banners', bannerController.findAll
    /*
        #swagger.tags = ['Banners']
    */
);
router.get('/banners/:id', bannerController.findOne
    /*
        #swagger.tags = ['Banners']
    */
);
router.put('/banners/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], bannerController.update
    /*
        #swagger.tags = ['Banners']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateBannerRequest"
            }
        }
    */
);
router.delete('/banners/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], bannerController.remove
     /*
        #swagger.tags = ['Banners']
        #swagger.security = [{
            "bearerAuth": {}
        }]
    */
);

router.post('/brand', [authMiddleware, aclMiddleware([ROLES.ADMIN])], brandController.create
    /*
        #swagger.tags = ['Brand']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateBrandRequest"
            }
        }
    */
);
router.get('/brand', brandController.findAll
    /*
        #swagger.tags = ['Brand']
    */
);
router.get('/brand/:id', brandController.findOne
     /*
        #swagger.tags = ['Brand']
    */
);
router.put('/brand/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], brandController.update
    /*
        #swagger.tags = ['Brand']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateBrandRequest"
            }
        }
    */
);
router.delete('/brand/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], brandController.remove
    /*
        #swagger.tags = ['Brand']
        #swagger.security = [{
            "bearerAuth": {}
        }]
    */
);


router.post('/product', [authMiddleware, aclMiddleware([ROLES.ADMIN])], productController.create
    /*
        #swagger.tags = ['Product']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateProductRequest"
            }
        }
    */
);
router.get('/product', productController.findAll
    /*
        #swagger.tags = ['Product']
        #swagger.parameters['brand'] = {
            in: 'query', 
            type: 'string',
        }
        #swagger.parameters['limit'] = {
            in: 'query', 
            type: 'number',
            default: 10
        }
        #swagger.parameters['page'] = {
            in: 'query', 
            type: 'number',
            default: 1
        }
        #swagger.parameters['isFeatured'] = {
            in: 'query', 
            type: 'boolean',
        }
        #swagger.parameters['isPublish'] = {
            in: 'query', 
            type: 'boolean',
        }
    */
);
router.get('/product/:id', productController.findOne
    /*
        #swagger.tags = ['Product']
    */
);
router.put('/product/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], productController.update
    /*
        #swagger.tags = ['Product']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/CreateProductRequest"
            }
        }
    */
);
router.delete('/product/:id', [authMiddleware, aclMiddleware([ROLES.ADMIN])], productController.remove
    /*
        #swagger.tags = ['Product']
        #swagger.security = [{
            "bearerAuth": {}
        }]
    */
);
router.get('/product/:slug/slug', productController.findOneBySlug
    /*
        #swagger.tags = ['Product']
    */
);

router.post('/media/upload-single', [
    authMiddleware, 
    aclMiddleware([ROLES.ADMIN, ROLES.STAFF]), 
    mediaMiddleware.single('file'),
],
    mediaController.single
     /*
        #swagger.tags = ['Media']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                                format: "binary"
                            }
                        }
                    }
                }
            }  
        }
    */
);
router.post('/media/upload-multiple', [
    authMiddleware, 
    aclMiddleware([ROLES.ADMIN, ROLES.STAFF]), 
    mediaMiddleware.multiple('files'),
], mediaController.multiple
    /*
        #swagger.tags = ['Media']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            files: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "binary"
                                }
                            }
                        }
                    }
                }
            }  
        }
    */
);
router.delete('/media/remove', [
    authMiddleware, 
    aclMiddleware([ROLES.ADMIN, ROLES.STAFF]), 
    
], mediaController.remove
 /*
        #swagger.tags = ['Media']
        #swagger.security = [{
            "bearerAuth": {}
        }]
        #swagger.requestBody = {
            required: true,
            schema: {
                $ref: "#/components/schemas/RemoveMediaRequest"
            }
        }
    */
);

export default router;
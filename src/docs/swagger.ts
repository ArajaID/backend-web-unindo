import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Dokumentasi API Website Unindo",
        description: "Dokumentasi API Website Unindo",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Development server",
        },
        {
            url: "https://backend-web-unindo.vercel.app/api",
            description: "Production server",
        },
    ], 
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",

            }
        },
        schemas: {
            LoginRequest: { 
                identifier: "admin@gmail.com/admin2025",
                password: "admin123",
            },
            RegisterRequest: {
                fullName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            ActivationRequest: { 
                code: "",
            },
            UpdateProfileRequest: {
                fullName: "",
                profilePicture: "",
            },
            UpdatePasswordRequest: {
                oldPassword: "",
                password: "",
                confirmPassword: "",
            },
            CreateBrandRequest: {
                name: "",
                icon: "",
                isShow: true,
            },
            CreateProductRequest: {
                name: "",
                description: "",
                image: "",
                brand: "",
                barcode: "",
                packaging: "",
                netWeight: "",
                licensing: {
                      isBPOM: true,
                      isHalal: true,
                      isKemenkes: true,
                },
                isFeatured: false,
                isPublish: false,
            },
            RemoveMediaRequest: {
                fileUrl: "",
            },
            CreateBannerRequest: {
                title: "",
                image: "",
                isShow: true
            },
        }
    },
}

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0"})(outputFile, endpointsFiles, doc);
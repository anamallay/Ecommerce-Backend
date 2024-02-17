"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
require("dotenv/config");
exports.dev = {
    app: {
        port: Number(process.env.PORT),
        jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY || 'default_secret_key',
        jwtUserAccessKey: process.env.JWT_USER_ACCESS_KEY || 'default_secret_access_key',
        smtpUsername: process.env.SMTP_USERNAME || 'default_smtp_username',
        smtpPassword: process.env.SMTP_PASSWORD || 'default_smtp_password',
        defaultProductImage: process.env.DEFAULT_IMAGE_PATH || 'default-image-path',
        jwtresetPassword: process.env.JWT_RESET_PASSWORD_KEY || 'default-image-path',
        braintreeMerchantId: process.env.BRINTREE_MERCHANT_ID,
        braintreePublicKey: process.env.BRINTREE_PUBLIC_KEY,
        braintreePrivateKey: process.env.BRINTREE_PRIVATE_KEY,
    },
    db: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/ecommerce-db',
    },
    cloud: {
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryApiSecretKey: process.env.CLOUDINARY_API_SECRET_KEY,
    },
};

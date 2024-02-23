// import "dotenv/config";

// export const dev = {
//   app: {
//     port: Number(process.env.PORT),
//     jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY,
//     jwtUserAccessKey: process.env.JWT_USER_ACCESS_KEY,
//     smtpUsername: process.env.SMTP_USERNAME,
//     smtpPassword: process.env.SMTP_PASSWORD,
//     defaultProductImage: process.env.DEFAULT_IMAGE_PATH,
//     jwtresetPassword: process.env.JWT_RESET_PASSWORD_KEY,
//     braintreeMerchantId: process.env.BRINTREE_MERCHANT_ID,
//     braintreePublicKey: process.env.BRINTREE_PUBLIC_KEY,
//     braintreePrivateKey: process.env.BRINTREE_PRIVATE_KEY,
//   },
//   db: {
//     url:
//       process.env.MONGODB_URL,
//   },
//   cloud: {
//     cloudinaryName: process.env.CLOUDINARY_NAME,
//     cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
//     cloudinaryApiSecretKey: process.env.CLOUDINARY_API_SECRET_KEY,
//   },
// }
// ===================
import 'dotenv/config'

interface AppConfiguration {
  port: number
  jwtUserActivationKey: string
  jwtUserAccessKey: string
  smtpUsername: string
  smtpPassword: string
  defaultProductImage: string
  jwtresetPassword: string
  braintreeMerchantId: string
  braintreePublicKey: string
  braintreePrivateKey: string
}

interface DatabaseConfiguration {
  url: string
}

interface CloudConfiguration {
  cloudinaryName: string
  cloudinaryApiKey: string
  cloudinaryApiSecretKey: string
}

interface Configuration {
  app: AppConfiguration
  db: DatabaseConfiguration
  cloud: CloudConfiguration
}

export const dev: Configuration = {
  app: {
    port: Number(process.env.PORT!),
    jwtUserActivationKey: process.env.JWT_USER_ACTIVATION_KEY!,
    jwtUserAccessKey: process.env.JWT_USER_ACCESS_KEY!,
    smtpUsername: process.env.SMTP_USERNAME!,
    smtpPassword: process.env.SMTP_PASSWORD!,
    defaultProductImage: process.env.DEFAULT_IMAGE_PATH!,
    jwtresetPassword: process.env.JWT_RESET_PASSWORD_KEY!,
    braintreeMerchantId: process.env.BRINTREE_MERCHANT_ID!,
    braintreePublicKey: process.env.BRINTREE_PUBLIC_KEY!,
    braintreePrivateKey: process.env.BRINTREE_PRIVATE_KEY!,
  },
  db: {
    url: process.env.MONGODB_URL!,
  },
  cloud: {
    cloudinaryName: process.env.CLOUDINARY_NAME!,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY!,
    cloudinaryApiSecretKey: process.env.CLOUDINARY_API_SECRET_KEY!,
  },
}

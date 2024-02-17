import { check, ValidationChain } from 'express-validator';

export const categoryValidations: ValidationChain[] = [
  check('title')
    .trim()
    .notEmpty()
    .withMessage('category title is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('category title should be at least 2-50 characters long'),
]

export const updateCategoryValidations: ValidationChain[] = [
  check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('category title is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('category title should be at least 2-50 characters long'),
]

export const ProductValidation: ValidationChain[] = [
    check('title')
    .trim()
    .notEmpty()
    .withMessage('Product title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('product title should be at least 3-50 characters long'),
    check('description')
    .trim()
    .notEmpty()
    .withMessage('provid description for the product')
    .isLength({ min: 10, max: 100 })
    .withMessage('Product description should be at least 10-100 characters long'),
    check('price')
    .trim()
    .notEmpty()
    .withMessage('provid price for the product')
    .isFloat({ min: 1})
    .withMessage('price must be a positive number'),
    check('quantity')
    .trim()
    .notEmpty()
    .withMessage('quantity is required')
    .isFloat({ min: 1})
    .withMessage('quantity must be a positive number'),
    // check('category')
    // .trim()
    // .notEmpty()
    // .withMessage('provid the category')
    // .isMongoId()
    // .withMessage('category Id is not correct'),
];

export const updateProductValidation: ValidationChain[] = [
    check('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('product title should be at least 3-50 characters long'),
    check('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('provid description for the product')
    .isLength({ min: 10, max: 100 })
    .withMessage('Product description should be at least 10-100 characters long'),
    check('price')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('provid price for the product')
    .isFloat({ min: 1})
    .withMessage('price must be a positive number'),
    check('quantity')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('quantity is required')
    .isFloat({ min: 1})
    .withMessage('quantity must be a positive number'),
    // check('category')
    // .optional()
    // .trim()
    // .notEmpty()
    // .withMessage('provid the category')
    // .isMongoId()
    // .withMessage('category Id is not correct'),
];


export const userValidation: ValidationChain[] = [
    check('first_name')
    .trim()
    .notEmpty()
    .withMessage('first name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('first name should be at least 2-50 characters long'),
    check('last_name')
    .trim()
    .notEmpty()
    .withMessage('last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('last name should be at least 2-50 characters long'),
    check('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email address is not correct pleass provid another email'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('passwoed is required')
    .isLength({ min: 6 })
    .withMessage('password must to be more than 5 characters'),
    check('phone')
    .trim()
    .notEmpty()
    .withMessage('phone number is required'),
    check('address')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('address must be at least 3 characters'),
]

export const updateUserValidation: ValidationChain[] = [
    check('first_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('first name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('first name should be at least 2-50 characters long'),
    check('last_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('last name should be at least 2-50 characters long'),
    check('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email address is not correct pleass provid another email'),
    check('password')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('passwoed is required')
    .isLength({ min: 6 })
    .withMessage('password must to be more than 5 characters'),
    check('phone')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('phone number is required'),
    check('address')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('address must be at least 3 characters'),
]

export const loginValidation: ValidationChain[] = [
    check('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email address is not correct pleass provid another email'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('passwoed is required')
    .isLength({ min: 6 })
    .withMessage('password must to be more than 5 characters'),
]
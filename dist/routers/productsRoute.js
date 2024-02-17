"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middlewares/auth");
var vaildations_1 = require("../validation/vaildations");
var runValidation_1 = require("../validation/runValidation");
var productsController_1 = require("../controller/productsController");
var uploadFile_1 = require("../middlewares/uploadFile");
var router = (0, express_1.Router)();
router.get('/', productsController_1.getAllProducts); // without pagination
router.get('/pagination', productsController_1.getAllProductsWithPagination); //with pagination
router.get('/:slug', productsController_1.getSingleProductBySlug);
// router.get('/filtered-products', getFilteredProducts)
router.post('/', auth_1.isLoggedIn, auth_1.isAdmin, uploadFile_1.uploadProduct.single('image'), vaildations_1.ProductValidation, runValidation_1.runValidation, productsController_1.createSingleProduct);
router.put('/:slug', auth_1.isLoggedIn, auth_1.isAdmin, uploadFile_1.uploadProduct.single('image'), vaildations_1.updateProductValidation, runValidation_1.runValidation, productsController_1.updateSingleProduct);
router.delete('/:slug', auth_1.isLoggedIn, auth_1.isAdmin, productsController_1.deleteSingleProduct);
exports.default = router;

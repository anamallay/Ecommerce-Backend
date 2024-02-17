"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controller/authController");
var auth_1 = require("../middlewares/auth");
var vaildations_1 = require("../validation/vaildations");
var runValidation_1 = require("../validation/runValidation");
var usersController_1 = require("../controller/usersController");
var router = (0, express_1.Router)();
// const limiter = rateLimit({
// 	windowMs: 5 * 60 * 1000, // 5 minutes
//     limit: 7,
//     message: 'You have reached maximum request, please try after 5 minutes'
// });
router.post('/login', /*limiter*/ auth_1.isLoggedOut, vaildations_1.loginValidation, runValidation_1.runValidation, authController_1.login);
router.post('/logout', authController_1.logout);
// forget and reset password 
router.post('/forget-password', auth_1.isLoggedOut, usersController_1.forgetPassword);
router.put('/reset-password', auth_1.isLoggedOut, usersController_1.resetPassword);
exports.default = router;

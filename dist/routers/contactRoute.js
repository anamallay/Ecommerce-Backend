"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contactUsController_1 = require("../controller/contactUsController");
var router = (0, express_1.Router)();
router.post('/', contactUsController_1.contactUs);
exports.default = router;

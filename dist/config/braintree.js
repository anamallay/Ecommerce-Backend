"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gateway = void 0;
var braintree = require("braintree");
// import braintree from "braintree";
var _1 = require(".");
exports.gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: _1.dev.app.braintreeMerchantId,
    publicKey: _1.dev.app.braintreePublicKey,
    privateKey: _1.dev.app.braintreePrivateKey,
});

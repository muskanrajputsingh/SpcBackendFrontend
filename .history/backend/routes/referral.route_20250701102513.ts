import express from "express";
import { createOrUpdateReferral } from "../controller/referral.controller.js";
import { updateReferralInProducts } from "../controller/product.controller.js";
const router = express.Router();

router.post("/create-or-update", createOrUpdateReferral);

export default router;

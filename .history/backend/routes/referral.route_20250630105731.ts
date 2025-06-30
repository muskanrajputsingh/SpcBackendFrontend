import express from "express";
import { parseReferralString } from "../controller/referral.controller.js";

const router = express.Router();

router.post("/parse", parseReferralString);

export default router;

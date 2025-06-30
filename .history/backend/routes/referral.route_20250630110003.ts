import express from "express";
import { parseReferralString } from "../controllers/referral.controller.js"; // ✅ Use curly braces

const router = express.Router();

router.post("/parse", parseReferralString); // ✅

export default router;

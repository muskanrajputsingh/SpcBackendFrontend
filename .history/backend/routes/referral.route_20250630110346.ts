import express from "express";
import { parseReferralString } from "../controller/referral.controller.js"; 

const router = Router();

router.post("/parse", parseReferralString); 

export default router;

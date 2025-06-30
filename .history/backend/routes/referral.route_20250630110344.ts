import express from "express";
import { parseReferralString } from "../controller/referral.controller.js"; 

const router = expressRouter();

router.post("/parse", parseReferralString); 

export default router;

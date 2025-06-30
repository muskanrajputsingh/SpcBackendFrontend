import express from "express";
import { parseReferralString } from "../control"; 

const router = express.Router();

router.post("/parse", parseReferralString); // ✅

export default router;

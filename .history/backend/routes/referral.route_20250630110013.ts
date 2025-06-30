import express from "express";
import { parseReferralString } from "../controllers/referra"; 

const router = express.Router();

router.post("/parse", parseReferralString); // ✅

export default router;

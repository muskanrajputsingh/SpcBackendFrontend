import express from "express";
import { parseReferralString } from "../";

const router = express.Router();

router.post("/parse", parseReferralString);

export default router;

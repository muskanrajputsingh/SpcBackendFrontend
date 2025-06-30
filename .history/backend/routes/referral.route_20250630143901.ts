import express from "express";
import { createOrUpdateReferral } from "../controllers/referral.controller.js";

const router = express.Router();
router.post("/create-or-update", createOrUpdateReferral);
export default router;

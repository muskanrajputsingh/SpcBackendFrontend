// routes/referral.route.ts
import express from "express";
import { createOrUpdateReferral } from "../controller/referral.controller.js"; // ✅ named import

const router = express.Router();

router.post("/create-or-update", createOrUpdateReferral); // ✅ proper usage

export default router;

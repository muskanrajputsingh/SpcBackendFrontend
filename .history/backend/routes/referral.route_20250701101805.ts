import express from "express";
import { createOrUpdateReferral } from "../controller/referral.controller";

const router = express.Router();

router.post("/create-or-update", createOrUpdateReferral);

export default router;

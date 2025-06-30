
import { Router } from "express";
import { parseReferralString } from "../controller/referral.controller.js";

const route = Router();

route.post("/parse", parseReferralString);

export default route;

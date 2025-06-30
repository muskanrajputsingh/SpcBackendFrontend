import { Router } from "express";
import { parseReferralString } from "../controller/referral.controller";

const route = Router();

route.post("/parse", parseReferralString);

export default route;

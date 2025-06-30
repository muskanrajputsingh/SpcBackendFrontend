import  * as parseReferralString  from "../controller/referral.controller.js"; 
import { Router } from "express";

const route = Router();

route.post("/parse", parseReferralString); 

export default route;

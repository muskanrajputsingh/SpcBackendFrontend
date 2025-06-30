import { Request, Response } from "express";
import db from "../client/connect.js";

// Inpu referral: "adarsh-40" }
export const parseReferralString = async (req: Request, res: Response) => {
  try {
    const { referral } = req.body;

    if (!referral || !referral.includes("-")) {
      return res.status(400).json({ error: "Invalid referral string format" });
    }

    const [namePart, percentPart] = referral.split("-");
    const percentage = parseInt(percentPart);

    if (isNaN(percentage)) {
      return res.status(400).json({ error: "Invalid percentage in referral" });
    }

    const associateUser = await db.user.findFirst({
      where: {
        name: namePart,
        role: "ASSOCIATE",
      },
    });

    if (!associateUser) {
      return res.status(404).json({ error: "Associate not found" });
    }

    return res.status(200).json({
      referralBy: associateUser.id,
      referralPercentage: percentage,
    });
  } catch (err) {
    console.error("Error parsing referral:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

import { Request, Response } from "express";
import db from "../client/connect.js";

export const createOrUpdateReferral = async (req: Request, res: Response) => {
  const { associateId, percent } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: associateId } });

    if (!user || user.role !== 'ASSOCIATE') {
      return res.status(404).json({ error: 'User not found or not an associate' });
    }

    const referralCode = `${user.name.toLowerCase().replace(/\s+/g, '-')}-${percent}`;

    // ✅ Check if referral exists for this associate
    let referral = await db.referral.findFirst({ where: { createdForId: associateId } });


    if (!referral) {
      // ✅ Create new referral and add associateId to usedBy
      referral = await db.referral.create({
        data: {
          referral: referralCode,
          createdFor: { connect: { id: associateId } },
          usedBy: [associateId], // ✅ direct string array
        },
      });
    } else {
      // ✅ Update usedBy only if associateId not already present
      const updatedUsedBy = referral.usedBy.includes(associateId)
        ? referral.usedBy
        : [...referral.usedBy, associateId];

      referral = await db.referral.update({
        where: { createdForId: associateId },
        data: {
          usedBy: updatedUsedBy, // ✅ assign directly
        },
      });
    }

    return res.status(200).json({ message: "Referral processed successfully", referral });

  } catch (err) {
    console.error("Error processing referral:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

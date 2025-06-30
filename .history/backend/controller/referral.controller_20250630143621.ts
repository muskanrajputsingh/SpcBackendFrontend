import { Request, Response } from "express";
import db from "../client/connect.js";

export const createOrUpdateReferral = async (req: Request, res: Response) => {
  const { associateId, percent } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: associateId } });

    if (!user || user.role !== "ASSOCIATE") {
      return res.status(404).json({ error: "User not found or not an associate" });
    }

    const referralCode = `${user.name.toLowerCase().replace(/\s+/g, "-")}-${percent}`;

    let referral = await db.referral.findFirst({
      where: { createdForId: associateId },
      select: {
        id: true,
        referral: true,
        createdAt: true,
        createdForId: true,
        usedBy: true,
      },
    });

    if (!referral) {
      const newReferral = await db.referral.create({
        data: {
          referral: referralCode,
          createdFor: { connect: { id: associateId } },
          usedBy: [associateId], // ✅ simple string array
        },
      });
      return res.status(200).json({ message: "Referral created", referral: newReferral });
    } else {
      const updatedUsedBy = referral.usedBy.includes(associateId)
        ? referral.usedBy
        : [...referral.usedBy, associateId];

      const updatedReferral = await db.referral.update({
        where: { id: referral.id },
        data: {
          usedBy: updatedUsedBy, // ✅ still simple string array
        },
      });

      return res.status(200).json({ message: "Referral updated", referral: updatedReferral });
    }
  } catch (error) {
    console.error("Error processing referral:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

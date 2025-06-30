import { Request, Res } from "express";
import db from "../client/connect.js";

export const createOrUpdateReferral = async (req, Res) => {
  const { associateId, percent } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: associateId } });
    if (!user || user.role !== 'ASSOCIATE') {
      return res.status(404).json({ error: 'User not found or not an associate' });
    }

    const referralCode = `${user.name.toLowerCase().replace(/\s+/g, '-')}-${percent}`;

    let referral = await db.referral.findUnique({
      where: { createdForId: associateId },
      select: {
        id: true,
        usedBy: true,
      },
    });

    if (!referral) {
      // ✅ Create new referral
      const newReferral = await db.referral.create({
        data: {
          referral: referralCode,
          createdFor: { connect: { id: associateId } },
          usedBy: {
            set: [associateId],
          },
        },
      });

      return res.status(201).json({ message: 'Referral created', referral: newReferral });
    } else {
      // ✅ Update usedBy array
      const updatedUsedBy = referral.usedBy.includes(associateId)
        ? referral.usedBy
        : [...referral.usedBy, associateId];

      const updatedReferral = await db.referral.update({
        where: { id: referral.id },
        data: {
          usedBy: {
            set: updatedUsedBy,
          },
        },
      });

      return res.status(200).json({ message: 'Referral updated', referral: updatedReferral });
    }
  } catch (err) {
    console.error('Error processing referral:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

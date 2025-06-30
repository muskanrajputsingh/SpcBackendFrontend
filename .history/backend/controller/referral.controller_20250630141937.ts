import db from '../client/connect.js';

export const createOrUpdateReferral = async (req: { body: { associateId: any; percent: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; referral?: { id: string; createdAt: Date; referral: string; createdForId: string; }; }): void; new(): any; }; }; }) => {
  const { associateId, percent } = req.body;

  try {
    const user = await db.user.findUnique({ where: { id: associateId } });
    if (!user || user.role !== 'ASSOCIATE') {
      return res.status(404).json({ error: 'User not found or not an associate' });
    }

    const referralCode = `${user.name.toLowerCase().replace(/\s+/g, '-')}-${percent}`;

    let referral = await db.referral.findUnique({ where: { createdForId: associateId } });

    if (!referral) {
      referral = await db.referral.create({
        data: {
          referral: referralCode,
          createdFor: { connect: { id: associateId } },
          usedBy: [associateId],
        },
      });
    } else if (!referral.usedBy.includes(associateId)) {
      referral = await db.referral.update({
        where: { createdForId: associateId },
        data: {
          usedBy: { set: [...referral.usedBy, associateId] },
        },
      });
    }

    res.status(200).json({ message: 'Referral processed successfully', referral });
  } catch (err) {
    console.error('Error processing referral:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// import { Request, Response } from "express";
// import db from "../client/connect.js";

// export const parseReferralString = async (req: Request, res: Response) => {
//   try {
//     const { referral } = req.body;

//     if (!referral || !referral.includes("-")) {
//       return res.status(400).json({ error: "Invalid referral string format" });
//     }

//     const [namePart, percentPart] = referral.split("-");
//     const percentage = parseInt(percentPart);

//     if (isNaN(percentage)) {
//       return res.status(400).json({ error: "Invalid percentage in referral" });
//     }

//     const associateUser = await db.user.findFirst({
//       where: {
//         name: namePart,
//         role: "ASSOCIATE",
//       },
//     });

//     if (!associateUser) {
//       return res.status(404).json({ error: "Associate not found" });
//     }

//     return res.status(200).json({
//       referralBy: associateUser.id,
//       referralPercentage: percentage,
//     });
//   } catch (err) {
//     console.error("Error parsing referral:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

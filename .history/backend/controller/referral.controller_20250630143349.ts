import { Request, Response } from "express";
import db from "../client/connect.js";

export const createOrUpdateReferral = async (req: Request, res: Response) => {
  const { associateId, percent } = req.body;

  try {
    // Check if associate exists
    const user = await db.user.findUnique({
      where: { id: associateId },
    });

    if (!user || user.role !== "ASSOCIATE") {
      return res.status(404).json({ error: "User not found or not an associate" });
    }

    // Create referral code e.g., "adarsh-40"
    const referralCode = `${user.name.toLowerCase().replace(/\s+/g, "-")}-${percent}`;

    // Find existing referral and SELECT usedBy
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
      // ✅ Create new referral and add associateId to usedBy
      const newReferral = await db.referral.create({
        data: {
          referral: referralCode,
          createdFor: { connect: { id: associateId } },
          usedBy: [associateId],
        },
      });
      return res.status(200).json({ message: "Referral created", referral: newReferral });
    } else {
      // ✅ Update usedBy only if associateId not already present
      const updatedUsedBy = referral.usedBy.includes(associateId)
        ? referral.usedBy
        : [...referral.usedBy, associateId];

      const updatedReferral = await db.referral.update({
        where: { id: referral.id }, // ✅ safer to use unique ID
        data: {
          usedBy: updatedUsedBy,
        },
      });

      return res.status(200).json({ message: "Referral updated", referral: updatedReferral });
    }
  } catch (err) {
    console.error("Error processing referral:", err);
    return res.status(500).json({ error: "Internal Server Error" });
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

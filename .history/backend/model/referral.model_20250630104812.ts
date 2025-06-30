import db from "../client/connect.js";

// Create a referral
export const createReferral = async (referral: string, createdForId: string) => {
  return await db.referral.create({
    data: {
      referral,
      createdFor: { connect: { id: createdForId } },
    },
  });
};

// Get 
export const getReferralByCode = async (referral: string) => {
  return await db.referral.findUnique({
    where: { referral },
    include: { usedBy: true, createdFor: true },
  });
};

// Add usedBy reference
export const addUsedBy = async (referralCode: string, userId: string) => {
  return await db.referral.update({
    where: { referral: referralCode },
    data: {
      usedBy: {
        connect: { id: userId },
      },
    },
  });
};

import db from "../client/connect.js";
import { CreateUserInput, UpdateUserInput } from "../client/types/user.types";

export const allUsers = async () => db.user.findMany({});

export const userById = async (id: string) =>
  db.user.findUnique({ where: { id } });

export const userByGmail = async (email: string) =>
  db.user.findUnique({ where: { email } });


export const createUser = async (data: CreateUserInput) => {
    const create = await db.user.create({
        data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || "USER",
        phone: data.phone || null,
        address: data.address || null,
        imageUrl: data.imageUrl || null
        },
        select: {
          id: true,
          email: true
        }
    });
    if (create) return create
}

export const updateUser = async (id: string, data: UpdateUserInput) => {
  return await db.user.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.password && { password: data.password }),
      ...(data.phone !== undefined && { phone: data.phone }),  
      ...(data.address && { address: data.address }),
      ...(data.imageUrl && { imageUrl: data.imageUrl }),
      ...(data.role && { role: data.role }),
      ...(data.createdById && { createdById: data.createdById }),
    },
  });
};

export const deleteUser = async (id: string) => {
    await db.user.delete({
        where: { id: id}
    })
}



import db from "../client/connect.js";
import { CreatePropertyInput, PropertyCategory, UpdatePropertyInput } from "../client/types/property.types.js";

export const allProperty = async () => db.property.findMany({});

export const propertyByCat = async (category: PropertyCategory) =>
  db.property.findMany({ where: { category } });

export const propertyById = async (id: string) =>
  db.property.findUnique({ where: { id } });

export const createProperty = async (data: CreatePropertyInput) => {
    await db.property.create({
        data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category || null,
        createdById: data.createdById,
        createdAt: new Date(),
        },
    });
}

export const updateProperty = async (id: string, data: UpdatePropertyInput) => {
    await db.property.update({
        where: { id: id },
        data: {
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            category: data.category || null,
        },
    });
}

export const deleteProperty = async (id: string) => {
    await db.property.delete({
        where: { id: id }
    });
}
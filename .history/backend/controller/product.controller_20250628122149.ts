import * as productModel from "../model/products.model.js"
import { Request, Response } from "express"
import { verifyToken } from "../utils/jwt.js"

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.getAllProducts()
        res.status(200).json(products)
    }
    catch (err) {
        return res.status(500).json({error: err, "message": "failed to get products"})
    }
}

export const getById = async (req: Request, res: Response) => {
    const {id} = req.params
    const products = await productModel.getSlug(id)
    res.status(201).json(products)
}

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await productModel.getByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    await productModel.deleteProduct(id)
    res.status(200).json({"message": "success"})
}


export const createData = async (req: Request, res: Response) => {
    const body = req.body;

    const token = verifyToken(req);

    if (!token || typeof token !== "string") {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }

    try {
        const product = await productModel.createProduct(body, token);  // token is now safe string
        return res.status(200).json({ message: "Product successfully created", product });
    } catch (error) {
        console.error("Product creation failed:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const createData = async (req: Request, res: Response) => {
  const body = req.body;
  const token = verifyToken(req);

  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
  }

  try {
    const product = await productModel.createProduct(body, token);
    return res.status(200).json({ message: "Product successfully created", product });
  } catch (error) {
    console.error("Product creation failed:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// export const updateData = async (req: Request, res: Response) => {
//     const body = req.body
//     try {
//         const products = await productModel.updateProduct(body, body.id)
//         res.status(200).json({products, error: "Updated successfully!"})
//     }
//     catch (err) {
//         res.status(404).json({"error": err})
//     }
// }

export const updateData = async (req: Request, res: Response) => {
    const { id } = req.params;   // ✅ Correct way to get ID from route
    const body = req.body;

    try {
        const product = await productModel.updateProduct(body, id);  // ✅ use id from params
        res.status(200).json({ product, message: "Updated successfully!" });
    } catch (err) {
        console.error("Update failed:", err);
        res.status(500).json({ error: "Update failed", details: err });
    }
};

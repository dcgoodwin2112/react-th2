import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/product:
 *   get:
 *     description: Returns an array of product objects
 *     responses:
 *       200:
 *         description: Array of product objects
 *         content:
 *           application/json:
 *             example:
 *               - id: "cl6pj4gq200277iznednc6n2w"
 *                 sku: "12345678"
 *                 name: "Product 1"
 *                 description: "Some generic product"
 *                 stock: 10
 *                 cost: 101.25
 *               - id: "cl6pj4gq400397izndxu79ms4"
 *                 sku: "B2345678"
 *                 name: "Product 2"
 *                 description: "Some other generic product"
 *                 stock: 15
 *                 cost: 201.55
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
}

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
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
}

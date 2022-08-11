import { PrismaClient, Product } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     description: Returns a product object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: term
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | {}>
) {
  const { id } = req.query;
  let response = {};
  if (typeof id === "string") {
    response = (await prisma.product.findFirst({ where: { id }, include: {categories: true}})) ?? {};
  }
  res.status(200).json(response);
}

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
 *         example: "cl6pj4gph00007iznzb2zn85k"
 *     responses:
 *       200:
 *         description: term
 *         content:
 *           application/json:
 *             example:
 *               id: "cl6pj4gq200277iznednc6n2w"
 *               sku: "12345678"
 *               name: "Product 1"
 *               description: "Some generic product"
 *               stock: 10
 *               cost: 101.25 
 *               categories:
 *                 - id: "cl6pj4gph00007iznzb2zn85k"
 *                   term: "category1"            
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

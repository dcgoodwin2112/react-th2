import { PrismaClient, Category } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     description: Returns a category object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the category term
 *         schema:
 *           type: string
 *         example: "cl6pj4gph00007iznzb2zn85k"
 *     responses:
 *       200:
 *         description: term
 *         content:
 *           application/json:
 *             example:
 *               id: "cl6pj4gph00007iznzb2zn85k"
 *               term: "category1"
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | {}>
) {
  const { id } = req.query;
  let response = {};
  if (typeof id === "string") {
    response = (await prisma.category.findFirst({ where: { id } })) ?? {};
  }
  res.status(200).json(response);
}

import { PrismaClient, Category } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/category:
 *   get:
 *     description: Returns an array of category objects
 *     responses:
 *       200:
 *         description: Array of category objects
 *   post:
 *     description: Creates a new category object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               term:
 *                 type: string
 *     responses:
 *       200:
 *         description: The created category object 
 *   delete:
 *     description: Deletes a category object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: The deleted category object 
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[] | Category | {}>
) {
  switch (req.method) {
    case "GET":
      console.log("GET");
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
      break;
    case "POST":
      const { term } = req.body;
      const category = await prisma.category.upsert({
        where: { term: term },
        update: {},
        create: { term },
      });
      res.status(200).json(category);
      break;
    case "DELETE":
      const { id } = req.body;
      const deleted = await prisma.category.delete({
        where: { id }
      });
      res.status(200).json(deleted);
      break;
    default:
      res.status(200).json({});
  }
}

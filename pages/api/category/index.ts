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
 *         content:
 *           application/json:
 *             example:
 *               - id: "cl6pj4gph00007iznzb2zn85k"
 *                 term: "category1"
 *               - id: "cl6pj4gpw00097izne2gwh7db"
 *                 term: "category2"
 *               - id: "cl6pj4gpy00187iznude27099"
 *                 term: "category3"
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
 *           example:
 *             term: "Category4"
 *     responses:
 *       200:
 *         description: The created category object
 *         content: 
 *           application/json: 
 *             example:
 *               id: "cl6pj4gph00007iznzb2zn85k"
 *               term: "category1"
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
 *           example:
 *             id: "cl6pj4gph00007iznzb2zn85k"
 *     responses:
 *       200:
 *         description: The deleted category object
 *         content:
 *           application/json:
 *             example:
 *               id: "cl6pj4gph00007iznzb2zn85k"
 *               term: "category1"
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

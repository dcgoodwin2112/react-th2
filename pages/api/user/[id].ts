import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     description: Returns a user object
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the user
 *         schema:
 *           type: string
 *         example: "cl6pj4gq600527iznahsmysq0"
 *     responses:
 *       200:
 *         description: term
 *         content:
 *           application/json:
 *             example:
 *               id: "cl6pj4gq600527iznahsmysq0"
 *               email: "user1@test.com"
 *               favoriteProducts:
 *                 - id: "cl6pj4gq200277iznednc6n2w"
 *                   sku: "12345678"
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | {}>
) {
  const { id } = req.query;
  let response = {};
  if (typeof id === "string") {
    response =
      (await prisma.user.findFirst({
        where: { id },
        include: { favoriteProducts: { select: { id: true, sku: true } } },
      })) ?? {};
  }
  res.status(200).json(response);
}

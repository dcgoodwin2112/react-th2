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
 *     responses:
 *       200:
 *         description: term
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

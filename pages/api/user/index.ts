import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Returns an array of category objects
 *     responses:
 *       200:
 *         description: Array of user objects
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}

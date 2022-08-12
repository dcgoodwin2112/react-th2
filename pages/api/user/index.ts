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
 *         content:
 *           application/json:
 *             example:
 *               - id: 'cl6pj4gq600527iznahsmysq0'
 *                 username: 'User1'
 *                 email: 'user1@mail.com'
 *               - id: 'cl6pj4gq600527iznahsmysq0'
 *                 username: 'User2'
 *                 email: 'user2@mail.com'
 */
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}

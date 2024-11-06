import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 세션 가져오기
  const session = await getSession({ req });

  // 인증되지 않은 경우 401 에러 반환
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // 세션에서 사용자 이메일을 가져와 해당 사용자를 조회
    const user: User | null = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

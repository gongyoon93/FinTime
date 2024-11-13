// import { validateAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("또큰3", token);

  // if (!token) {
  //   return NextResponse.json(
  //     { error: "Authentication required" },
  //     { status: 401 }
  //   );
  // }

  try {
    // await validateAuth(request.headers.get("authorization"));

    //조건과 일치하는 데이터들 조회하는 findMany
    const userHistories = await prisma.history.findMany({
      where: {
        authorId: id,
      },
    });

    return NextResponse.json(userHistories);
  } catch (error) {
    console.error("Error fetching histories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

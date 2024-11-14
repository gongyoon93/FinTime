import prisma from "@/app/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";
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

  const month = request.nextUrl.searchParams.get("month");

  // if (!month) {
  //   return NextResponse.json(
  //     { error: "Month parameter is required" },
  //     { status: 400 }
  //   );
  // }

  try {
    const currentDate = month ? month : new Date();
    const startOfThisMonth = startOfMonth(currentDate); // 이번 달의 첫째 날
    const endOfThisMonth = endOfMonth(currentDate);

    //조건과 일치하는 데이터들 조회하는 findMany
    const userHistories = await prisma.history.findMany({
      where: {
        authorId: id,
        date: {
          gte: startOfThisMonth,
          lte: endOfThisMonth,
        },
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

interface RequestBody {
  amount: number;
  content: string;
  transaction: "INCOME" | "EXPENSE" | "TRANSFER";
}

export async function POST(request: Request) {
  try {
    // await validateAuth(request.headers.get("authorization"));

    const body: RequestBody = await request.json();

    const history = await prisma.history.create({
      data: {
        authorId: 1,
        amount: body.amount,
        content: body.content,
        transaction: body.transaction,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const result = history;
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 401,
    });
  }
}

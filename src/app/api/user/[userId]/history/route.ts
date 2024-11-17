import { validateAuth } from "@/app/lib/auth";
import { getStartOfMonthInKST } from "@/app/lib/date";
import prisma from "@/app/lib/prisma";
import { endOfMonth } from "date-fns";
// import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  // validateAuth(request);
  const headers = request.headers;
  const cookie = headers.get("cookie");
  const authorization = headers.get("authorization");

  console.log("요청 쿠키:", cookie);
  console.log("Authorization 헤더:", authorization);

  // if (!token) {
  //   return NextResponse.json(
  //     { error: "Authentication required" },
  //     { status: 401 }
  //   );
  // }

  const month = request.nextUrl.searchParams.get("month");

  console.log("route의 month!", month);
  const startDate = month
    ? getStartOfMonthInKST(Number(month))
    : getStartOfMonthInKST();
  console.log("스타트데이트", startDate);
  const endDate = endOfMonth(startDate);
  console.log("엔드데이트", endDate);

  try {
    //조건과 일치하는 데이터들 조회하는 findMany
    const userHistories = await prisma.history.findMany({
      where: {
        authorId: id,
        date: {
          gte: startDate,
          lte: endDate,
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

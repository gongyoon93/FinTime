import { validateSession } from "@/app/lib/auth";
import { getStartOfMonthInKST } from "@/app/lib/date";
import prisma from "@/app/lib/prisma";
import { endOfMonth, startOfDay } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { groupBy, sumBy } from "lodash";
import { format, toZonedTime } from "date-fns-tz";
import { Decimal } from "@prisma/client/runtime/library";

// 한국 시간대 설정
const timeZone = "Asia/Seoul";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  const accessToken = await validateSession(request);

  if (!accessToken) {
    return new NextResponse(JSON.stringify({ error: "No Authorization" }), {
      status: 401,
    });
  }

  const month = request.nextUrl.searchParams.get("month");
  const year = request.nextUrl.searchParams.get("year");
  const startDate =
    year && month
      ? getStartOfMonthInKST(Number(year), Number(month))
      : getStartOfMonthInKST();
  const endDate = endOfMonth(startDate);

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
      orderBy: {
        date: "desc",
      },
      include: {
        category: true,
      },
    });

    // 날짜별로 그룹화
    const groupedByDate = groupBy(userHistories, (history) => {
      // console.log(history.date);
      // console.log(startOfDay(history.date), "yyyy-MM-dd");
      const date = toZonedTime(history.date, timeZone);
      return format(startOfDay(history.date), "yyyy-MM-dd");
    });

    // 월별 수입/지출 합산
    const monthlyIncome = sumBy(
      userHistories.filter((history) => history.transaction === "INCOME"),
      (history) => new Decimal(history.amount).toNumber()
    );

    const monthlyExpense = sumBy(
      userHistories.filter((history) => history.transaction === "EXPENSE"),
      (history) => new Decimal(history.amount).toNumber()
    );

    // 일별 데이터 구성
    const list = Object.entries(groupedByDate).map(([date, histories]) => {
      const dailyIncome = sumBy(
        histories.filter((history) => history.transaction === "INCOME"),
        (history) => new Decimal(history.amount).toNumber()
      );

      const dailyExpense = sumBy(
        histories.filter((history) => history.transaction === "EXPENSE"),
        (history) => new Decimal(history.amount).toNumber()
      );

      return {
        date,
        dailyIncome,
        dailyExpense,
        dailyList: histories,
      };
    });

    return NextResponse.json(
      { monthlyIncome, monthlyExpense, list },
      { status: 200 }
    );
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

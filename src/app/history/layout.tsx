import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";
import { getHistoryByUser } from "../lib/history";

// export const dynamic = "force-dynamic";

export default async function HistoryLayout({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const year =
    typeof searchParams?.year === "string" ? searchParams.year : currentYear;
  const month =
    typeof searchParams?.month === "string" ? searchParams.month : currentMonth;

  const session = await getServerSession(authOptions);

  // console.log("layout의 searchParams", searchParams);
  // console.log("layout의 month", month);

  if (!session?.user.id || !session?.user.accessToken) {
    return (
      <HistoryPage
        initialHistories={{ monthlyIncome: 0, monthlyExpense: 0, list: [] }}
        initialSession={null}
        expired={false}
      />
    );
  }

  const res = await getHistoryByUser(
    session.user.id,
    session.user.accessToken,
    Number(year),
    Number(month)
  );

  return (
    <HistoryPage
      initialHistories={
        res.status === 200
          ? res.data
          : { monthlyIncome: 0, monthlyExpense: 0, list: [] }
      }
      initialSession={session}
      expired={res.status === 401}
    />
  );
}

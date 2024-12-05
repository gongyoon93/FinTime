import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";
import { getHistoryByUser } from "../lib/history";

// export const dynamic = "force-dynamic";

export default async function HistoryLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: Record<string, string | string[] | undefined>;
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
      />
    );
  }

  const res = await getHistoryByUser(
    session.user.id,
    session.user.accessToken,
    Number(year),
    Number(month)
  );

  console.log("layout의 확인");

  return (
    <>
      <HistoryPage
        initialHistories={
          res.status === 200
            ? res.data
            : { monthlyIncome: 0, monthlyExpense: 0, list: [] }
        }
        initialSession={session}
      />
    </>
  );
}

//styled-components code를 분리하고 초기 fetch를 제거? > 이 상태에 대한 개선된 점 확인
// + css in js인 styled-components를 tailwind를 변경할지?(현업에서 많이 사용하고 업데이트가 잘되는지)

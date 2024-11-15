import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";
import { getHistoryByUser } from "../lib/history";

export default async function HistoryLayout({
  searchParams,
}: {
  searchParams: { month?: string };
}) {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !session.user.id ||
    !session.user.accessToken
  ) {
    throw new Error("User is not authenticated or access token is missing.");
  }

  const month = searchParams?.month || new Date().getMonth() + 1;

  const histories = await getHistoryByUser(
    session?.user.id,
    session?.user.accessToken,
    month
  );
  console.log("layout의 month", month);
  console.log("layout의 histories", histories);

  return <HistoryPage histories={histories} month={month} />;
}

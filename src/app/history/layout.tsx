import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";
import { getHistoryByUser } from "../lib/history";

export default async function HistoryLayout() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !session.user.id ||
    !session.user.accessToken
  ) {
    throw new Error("User is not authenticated or access token is missing.");
  }

  const month = (new Date().getMonth() + 1).toString();

  const histories = await getHistoryByUser(
    session?.user.id,
    session?.user.accessToken,
    Number(month)
  );
  console.log("layout의 month", month);
  console.log("layout의 histories", histories);

  return <HistoryPage initialHistories={histories} />;
}

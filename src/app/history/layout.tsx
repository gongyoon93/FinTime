import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";
import { getHistoryByUser } from "../lib/history";

export default async function HistoryLayout() {
  const session = await getServerSession(authOptions);

  const month = (new Date().getMonth() + 1).toString();
  console.log("layout의 accessToken", session?.user.accessToken);

  const res = await getHistoryByUser(
    session?.user.id || null,
    session?.user.accessToken || null,
    Number(month)
  );

  console.log("layout의 session!", session);
  console.log("layout의 month!", month);
  console.log("layout의 histories!", res.data);

  let data;
  if (res.status === 200) {
    data = res.data;
  } else if (res.status === 401) {
    data = [];
  } else {
    data = [];
  }

  return (
    <HistoryPage
      initialHistories={data}
      initialSession={session}
      expired={res.expired}
    />
  );
}

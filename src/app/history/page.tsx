import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryLayout from "./layout";

// 동적 렌더링을 강제하여 데이터가 최신 상태로 유지되도록 설정
//  export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user || !session.accessToken) {
  // 세션이 유효하지 않을 때
  // console.error("User is not authenticated or access token is missing.");
  // }

  // const isSessionValid = !!token;
  let histories = [];
  // if (isSessionValid) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/history/user/${session?.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
      credentials: "include",
    }
  );

  if (res.ok) {
    histories = await res.json();
    console.log("결과임" + JSON.stringify(histories));
  }

  return <HistoryLayout histories={histories} />;
}

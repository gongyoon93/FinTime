import { getServerSession } from "next-auth";
import HistoryLayout from "./layout";

// 동적 렌더링을 강제하여 데이터가 최신 상태로 유지되도록 설정
//  export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const session = await getServerSession();
  console.log("세션임" + session?.accessToken);
  // const isSessionValid = !!token;
  let histories = [];

  // if (isSessionValid) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/history/user/1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-store",
  });

  if (res.ok) {
    histories = await res.json();
    console.log("결과임" + JSON.stringify(histories));
  }
  // }

  // const id = 1;
  // 서버 컴포넌트에서 API 데이터 패칭
  // const res = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/history/user/${id}`,
  //   {
  //     headers: { "Content-Type": "application/json",
  //       "Authorization":
  //      },
  //     cache: "no-store", // 항상 최신 데이터 사용
  //   }
  // );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  // // 데이터를 JSON으로 파싱
  // const histories = await res.json();

  // // JSON 데이터를 콘솔에 출력
  // console.log("이거 맞아요3?", histories);

  return <HistoryLayout histories={histories} />;
}

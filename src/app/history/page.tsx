"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import { History, historyState } from "../atom/historyAtom";
import { useRecoilState } from "recoil";
import { getHistoryByUser } from "../lib/history";

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const Widget = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const WidgetTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const WidgetContent = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export default function HistoryPage({
  initialHistories,
}: {
  initialHistories: History[];
}): React.ReactNode {
  const [histories, setHistories] = useRecoilState(historyState);

  useEffect(() => {
    setHistories(initialHistories);
  }, [initialHistories]);
  // console.log("히스토리 데이터:", JSON.stringify(histories));
  // console.log("전달된 month 값:", month);
  const searchParams = useSearchParams();
  // const [date, setDate] = useRecoilState(dateState);
  // const router = useRouter();
  useEffect(() => {
    // 비동기 작업을 처리할 함수 정의
    const fetchHistory = async () => {
      try {
        const month = searchParams?.get("month");
        if (month) {
          const histories = await getHistoryByUser(
            session?.user.id,
            session?.user.accessToken,
            Number(month)
          );
          console.log("Refetched histories:", histories);

          setHistories(histories);
        }
      } catch (error) {
        console.error("Failed to refetch histories", error);
      }
    };

    fetchHistory();
  }, [searchParams]);

  return (
    <WidgetGrid>
      {histories?.map((history) => (
        <Widget key={history.id}>
          <WidgetTitle>{history.transaction}</WidgetTitle>
          <WidgetContent>{history.amount}</WidgetContent>
        </Widget>
      ))}
    </WidgetGrid>
  );
}

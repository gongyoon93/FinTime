"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";

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

export interface History {
  id: number;
  transaction: string;
  amount: number;
  content?: string;
  date: Date;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoryProps {
  histories: History[] | null;
  month?: string;
}

export default function HistoryPage({
  histories,
  month,
}: HistoryProps): React.ReactNode {
  // console.log("히스토리 데이터:", JSON.stringify(histories));
  // console.log("전달된 month 값:", month);
  const searchParams = useSearchParams();
  // const [date, setDate] = useRecoilState(dateState);
  // const router = useRouter();
  useEffect(() => {
    //fetchHistory 로직 추가 + histories data 전역 상태로 관리
    const month =
      searchParams?.get("month") || (new Date().getMonth() + 1).toString();
    // setDate(getStartOfMonthInKST(Number(month)));
    // console.log("현재 month:", month);
    // console.log("현재 month:", currentMonth);
  }, [searchParams, month]);

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

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import { useRecoilValue } from "recoil";
import styled from "styled-components";
// import { dateState } from "../atom/dateAtom";
// import { useRouter } from "next/navigation";

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
  month?: string | number;
}

export default function HistoryPage({
  histories,
  month,
}: HistoryProps): React.ReactNode {
  console.log("히스토리임", JSON.stringify(histories));
  console.log("page의 month", month);
  const searchParams = useSearchParams();
  // const date = useRecoilValue(dateState);
  // const router = useRouter();
  useEffect(() => {
    console.log("page의 리렌더링", month);
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

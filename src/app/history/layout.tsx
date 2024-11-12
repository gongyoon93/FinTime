"use client";

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

interface History {
  id: number;
  transaction: string;
  amount: number;
  content?: string;
  date: Date;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface HistoryProps {
  histories: History[];
}

export default function HistoryLayout({ histories }: HistoryProps) {
  console.log(histories);
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

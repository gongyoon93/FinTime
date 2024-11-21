"use client";

import { History } from "@/app/atom/historyAtom";
import { format } from "date-fns";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
`;

const ContentDay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  padding: 8px 0;
  border-bottom: 1px solid #333;
`;

const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  font-weight: bold;
  padding: 8px 0;
  border-bottom: 1px solid #333;
`;

const Amount = styled.div<{ isExpense?: boolean }>`
  color: ${({ isExpense }) => (isExpense ? "red" : "blue")};
`;

export default function HistoryContent(history: History) {
  return (
    <ContentContainer key={history.id + "" + history.date}>
      <ContentDay>
        <div>24 목요일 2024.10{format(history.date, "dd yyyy.MM")}</div>
        <Amount>{history.amount}</Amount>
      </ContentDay>
      <ContentItem>
        <div>부모님</div>
        <div>오후 8:18 현금</div>
        <Amount isExpense>8,777,565,555,555원</Amount>
      </ContentItem>
      <ContentItem>
        <div>용돈</div>
        <div>오후 4:21 현금</div>
        <Amount>300원</Amount>
      </ContentItem>
      <ContentDay>
        <div>23 수요일 2024.10</div>
        <Amount>0원</Amount>
      </ContentDay>
      <ContentItem>
        <div>문화생활</div>
        <div>오후 9:37 현금</div>
        <Amount isExpense>2,000원</Amount>
      </ContentItem>
    </ContentContainer>
  );
}

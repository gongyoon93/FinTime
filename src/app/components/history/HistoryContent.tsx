"use client";

import { HistoryList } from "@/app/atom/historyAtom";
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

export default function HistoryContent({
  datelist,
}: {
  datelist: HistoryList[];
}) {
  return (
    <>
      {datelist?.map((date) => (
        <ContentContainer key={"container " + format(date.date, "dd yyyy.MM")}>
          <ContentDay>
            <div>{format(date.date, "dd yyyy.MM")}</div>
            <Amount>{`${date.dailyIncome.toLocaleString("ko-KR")}원`}</Amount>
          </ContentDay>
          {date.dailyList?.map((daily) => (
            <ContentItem
              key={
                "container " +
                format(date.date, "dd yyyy.MM") +
                " author " +
                daily.id
              }
            >
              <div>{daily.content}</div>
              <div>{format(daily.date, "HH:mm")}</div>
              <Amount isExpense>{`${daily.amount.toLocaleString(
                "ko-KR"
              )}원`}</Amount>
            </ContentItem>
          ))}
        </ContentContainer>
      ))}
    </>
  );
}

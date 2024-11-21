"use client";

import styled from "styled-components";

const SummaryContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #fff;
`;

const SummaryItem = styled.div`
  text-align: center;
`;

const Amount = styled.div<{ isExpense?: boolean }>`
  color: ${({ isExpense }) => (isExpense ? "red" : "blue")};
`;

export default function HistorySummary({
  monthlyIncome,
  monthlyExpense,
}: {
  monthlyIncome: number;
  monthlyExpense: number;
}) {
  return (
    <SummaryContainer>
      <SummaryItem>
        <div>수입</div>
        <Amount>{`${monthlyIncome.toLocaleString("ko-KR")}원`}</Amount>
      </SummaryItem>
      <SummaryItem>
        <div>지출</div>
        <Amount isExpense>{`${monthlyExpense.toLocaleString(
          "ko-KR"
        )}원`}</Amount>
      </SummaryItem>
      <SummaryItem>
        <div>합계</div>
        <Amount isExpense>-8,777,565,557,255원</Amount>
      </SummaryItem>
    </SummaryContainer>
  );
}

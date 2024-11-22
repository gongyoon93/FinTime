"use client";

import { useMemo } from "react";
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
  const amount = useMemo(() => {
    const difference = monthlyIncome - monthlyExpense;
    return {
      type: difference >= 0 ? "income" : "expense",
      value: Math.abs(difference),
    };
  }, [monthlyIncome, monthlyExpense]);
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
        <Amount isExpense={amount.type === "expense" ? true : false}>
          {`${
            amount.type === "expense"
              ? "-"
              : "" + amount.value.toLocaleString("ko-KR")
          }원`}
        </Amount>
      </SummaryItem>
    </SummaryContainer>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { History, historyState } from "../atom/historyAtom";
import { useRecoilState } from "recoil";
import { getHistoryByUser } from "../lib/history";
import { Session } from "next-auth";
import { sessionState } from "../atom/sessionAtom";
import { signOut } from "next-auth/react";
import { isValidMonth, isValidYear } from "../lib/date";
import { modifyTransaction } from "../lib/util";
import TranSummary from "../components/history/HistorySummary";
import HistoryContent from "../components/history/HistoryContent";

const WidgetGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 1rem 1rem;
`;

const HistoryContainer = styled.section`
  width: calc(100% - 2rem);
  height: calc(100% - 7rem);
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Widget = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
`;

const WidgetTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const WidgetContent = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

interface HistoryPageProps {
  initialHistories: History[];
  initialSession: Session | null;
  expired: boolean;
}

export default function HistoryPage({
  initialHistories,
  initialSession,
  expired,
}: HistoryPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [histories, setHistories] = useRecoilState(historyState);
  const [session, setSession] = useRecoilState(sessionState);

  // 현재 URL의 year/month 파라미터 확인
  const validateAndGetYearMonth = useCallback(() => {
    const currentYear = new Date().getFullYear().toString();
    const year = searchParams?.get("year") ?? currentYear;

    const currentMonth = (new Date().getMonth() + 1).toString();
    const month = searchParams?.get("month") ?? currentMonth;

    if (!isValidYear(year) || !isValidMonth(month)) {
      router.replace(
        `/history?year=${isValidYear(year) ? year : currentYear}&month=${
          isValidMonth(month) ? month : currentMonth
        }`
      );
    }

    return {
      year: isValidYear(year) ? year : currentYear,
      month: isValidMonth(month) ? month : month,
    };
  }, [searchParams, router]);

  const fetchHistory = useCallback(
    async (year: string, month: string) => {
      if (!session?.user.id || !session?.user.accessToken) return;

      try {
        const res = await getHistoryByUser(
          session.user.id,
          session.user.accessToken,
          Number(year),
          Number(month)
        );

        if (res.status === 200) {
          setHistories(res.data);
        } else if (res.status === 401) {
          setSession(null);
          signOut({ redirect: true });
        } else {
          setHistories([]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistories([]);
      }
    },
    [session, setHistories, router]
  );

  // 초기 데이터 설정
  useEffect(() => {
    setHistories(initialHistories);
    setSession(initialSession);
  }, [initialHistories, initialSession, setHistories, setSession]);

  // URL 파라미터 변경 감지 및 데이터 fetch
  useEffect(() => {
    const { year, month } = validateAndGetYearMonth();
    fetchHistory(year, month);
  }, [searchParams, validateAndGetYearMonth, fetchHistory]);

  return (
    <>
      <TranSummary />
      <HistoryContainer>
        {histories?.map((history) => (
          <HistoryContent />
          // <Widget key={history.id}>
          //   <WidgetTitle>{modifyTransaction(history.transaction)}</WidgetTitle>
          //   <WidgetContent>{history.amount}</WidgetContent>
          // </Widget>
        ))}
        {/* <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>111</WidgetTitle>
          <WidgetContent>222</WidgetContent>
        </Widget> */}
      </HistoryContainer>
    </>
  );
}

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

  // 현재 URL의 month 파라미터 확인
  const validateAndGetMonth = useCallback(() => {
    const month = searchParams?.get("month");
    const currentMonth = (new Date().getMonth() + 1).toString();

    if (
      !month ||
      isNaN(Number(month)) ||
      Number(month) < 1 ||
      Number(month) > 12
    ) {
      // 유효하지 않은 month인 경우 현재 월로 리다이렉트
      router.replace(`/history?month=${currentMonth}`);
      return currentMonth;
    }

    return month;
  }, [searchParams, router]);

  const fetchHistory = useCallback(
    async (month: string) => {
      if (!session?.user.id || !session?.user.accessToken) return;

      try {
        const res = await getHistoryByUser(
          session.user.id,
          session.user.accessToken,
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
    const month = validateAndGetMonth();
    fetchHistory(month);
  }, [searchParams, validateAndGetMonth, fetchHistory]);

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

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
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

export default function HistoryPage({
  initialHistories,
  initialSession,
  expired,
}: {
  initialHistories: History[];
  initialSession: Session | null;
  expired: boolean;
}): React.ReactNode {
  const searchParams = useSearchParams();

  const [histories, setHistories] = useRecoilState(historyState);
  const [session, setSession] = useRecoilState(sessionState);

  const month = searchParams?.get("month");

  useEffect(() => {
    setHistories(initialHistories);
    setSession(initialSession);
  }, []);

  useEffect(() => {
    if (expired) {
      setSession(null);
      signOut({ redirect: true });
    }
  }, [expired]);

  // console.log("initialHistories", initialHistories);
  // console.log("initialSession", initialSession);

  // middleware 사용량 문제 해결..
  useEffect(() => {
    const fetchHistory = async () => {
      if (month) {
        const res = await getHistoryByUser(
          session?.user.id || null,
          session?.user.accessToken || null,
          Number(month)
        );
        if (res.status === 200) {
          console.log("Refetched histories:", res.data);
          setHistories(res.data);
        } else if (res.status === 401) {
          setSession(null);
          signOut({ redirect: true });
        } else {
          setHistories([]);
        }
      }
    };
    fetchHistory();
  }, [month]);

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

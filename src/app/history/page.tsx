"use client";

// import { getSession } from "next-auth/react";
// import { useEffect, useState } from "react";
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

const History = () => {
  // const [history, setHistory] = useState([]);
  // const session = getSession();
  // useEffect(() => {
  //   const fetchHistory = async () => {
  //       await fetch(`${process.env.NEXTAUTH_URL}/api/user/${session.}`);
  //   };
  //   fetchHistory();
  // }, []);

  return (
    <WidgetGrid>
      <Widget>
        <WidgetTitle>수입</WidgetTitle>
        <WidgetContent>1,234</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>지출</WidgetTitle>
        <WidgetContent>45,678</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>잔액</WidgetTitle>
        <WidgetContent>42</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
      <Widget>
        <WidgetTitle>예산</WidgetTitle>
        <WidgetContent>133</WidgetContent>
      </Widget>
    </WidgetGrid>
  );
};

export default History;

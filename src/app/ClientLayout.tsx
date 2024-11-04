"use client";

import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GlobalStyle } from "./style/GlobalStyle";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #f7fafc;
  overflow-y: auto;
`;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <LayoutContainer>
        <Header />
        <ContentContainer>
          <Navbar />
          <MainContent>{children}</MainContent>
        </ContentContainer>
        <Footer />
      </LayoutContainer>
      <GlobalStyle />
    </RecoilRoot>
  );
}

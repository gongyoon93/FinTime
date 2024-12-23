"use client";
//client component

import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalStyle } from "./style/GlobalStyle";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import StyledComponentsRegistry from "./lib/registry";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  height: calc(100% - 12rem);
  padding-top: 6rem;
  padding-bottom: 6rem;
`;

const MainContent = styled.main`
  height: 100%;
  background-color: #f7fafc;
  /* overflow-y: auto; */
`;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/auth/signin";

  return (
    <RecoilRoot>
      <SessionProvider>
        <StyledComponentsRegistry>
          {isLoginPage && <>{children}</>}
          {!isLoginPage && (
            <LayoutContainer>
              <Header />
              <ContentContainer>
                <MainContent>{children}</MainContent>
              </ContentContainer>
              <Footer />
            </LayoutContainer>
          )}
          <GlobalStyle />
        </StyledComponentsRegistry>
      </SessionProvider>
    </RecoilRoot>
  );
}

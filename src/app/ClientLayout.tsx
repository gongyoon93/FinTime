"use client";
//client component

import { RecoilRoot } from "recoil";
import styled from "styled-components";
import Header from "./components/Header";
// import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GlobalStyle } from "./style/GlobalStyle";
import { SessionProvider } from "next-auth/react";
import AuthCheck from "./AuthCheck";
import { usePathname } from "next/navigation";

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
  height: calc(100% - 2rem);
  padding: 1rem;
  background-color: #f7fafc;
  overflow-y: auto;
`;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <RecoilRoot>
      <SessionProvider>
        {isLoginPage && <>{children}</>}
        {!isLoginPage && (
          <AuthCheck>
            <LayoutContainer>
              <Header />
              <ContentContainer>
                {/* <Navbar /> */}
                <MainContent>{children}</MainContent>
              </ContentContainer>
              <Footer />
            </LayoutContainer>
          </AuthCheck>
        )}
        <GlobalStyle />
      </SessionProvider>
    </RecoilRoot>
  );
}

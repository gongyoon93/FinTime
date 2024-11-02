"use client";

import { BarChart2, Bell, Home, Menu, Settings, Users, X } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.nav<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  background-color: #1a202c;
  color: white;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const SidebarContent = styled.div`
  padding: 1rem;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d3748;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #f7fafc;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
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

const Abook = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <DashboardContainer>
        <Sidebar isOpen={isSidebarOpen}>
          <SidebarContent>
            <NavItem href="#">
              <Home size={20} /> Home
            </NavItem>
            <NavItem href="#">
              <BarChart2 size={20} /> Analytics
            </NavItem>
            <NavItem href="#">
              <Users size={20} /> Users
            </NavItem>
            <NavItem href="#">
              <Settings size={20} /> Settings
            </NavItem>
          </SidebarContent>
        </Sidebar>
        <MainContent>
          <Header>
            <MenuButton onClick={toggleSidebar} aria-label="Toggle menu">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </MenuButton>
            <h1>가계부</h1>
            <Bell size={24} />
          </Header>
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
              <WidgetTitle>지출</WidgetTitle>
              <WidgetContent>42</WidgetContent>
            </Widget>
            <Widget>
              <WidgetTitle>수입</WidgetTitle>
              <WidgetContent>133</WidgetContent>
            </Widget>
          </WidgetGrid>
        </MainContent>
      </DashboardContainer>
    </>
  );
};

export async function getStaticProps() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  return {
    props: {
      // posts,
    },
  };
}

export default Abook;

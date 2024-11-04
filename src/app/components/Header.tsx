"use client";

import { Bell, Menu, X } from "lucide-react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { sidebarState } from "../atoms/sidebarAtom";

const HeaderContainer = styled.header`
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

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <HeaderContainer>
      <MenuButton onClick={toggleSidebar} aria-label="Toggle menu">
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </MenuButton>
      <h1>가계부</h1>
      <Bell size={24} />
    </HeaderContainer>
  );
};

export default Header;

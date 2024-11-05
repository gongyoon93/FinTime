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
  p {
    font-size: 1.8rem;
  }
`;

const MenuButton = styled.button`
  display: flex;
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
      <p>가계부</p>
      <Bell size={24} />
    </HeaderContainer>
  );
};

export default Header;

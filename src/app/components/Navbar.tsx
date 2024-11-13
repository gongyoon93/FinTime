"use client";

import { BarChart2, Home, Settings, Users } from "lucide-react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../atom/sidebarAtom";

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

const Navbar = () => {
  const isSidebarOpen = useRecoilValue(sidebarState);

  return (
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
  );
};

export default Navbar;

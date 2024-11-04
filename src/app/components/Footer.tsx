"use client";

import { BarChart2, BookOpen, MoreHorizontal, Shield } from "lucide-react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: #1a202c;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
`;

const FooterItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    color: #a0aec0;
  }

  svg {
    margin-bottom: 0.25rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterItem href="#">
        <BookOpen size={20} />
        가계부
      </FooterItem>
      <FooterItem href="#">
        <BarChart2 size={20} />
        통계
      </FooterItem>
      <FooterItem href="#">
        <Shield size={20} />
        차단
      </FooterItem>
      <FooterItem href="#">
        <MoreHorizontal size={20} />
        더보기
      </FooterItem>
    </FooterContainer>
  );
};

export default Footer;

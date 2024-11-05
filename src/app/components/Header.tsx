"use client";

import {
  MessageCircle,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styled from "styled-components";
import { useState } from "react";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  position: fixed;
  top: 0;
  z-index: 1000;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  p {
    font-size: 1.8rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  p {
    margin: 0 1rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Header = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1 };
  });

  const handlePreviousMonth = () => {
    setDate((prevDate) => {
      const newMonth = prevDate.month - 1;
      const year = newMonth < 1 ? prevDate.year - 1 : prevDate.year;
      const month = newMonth < 1 ? 12 : newMonth;
      return { year, month };
    });
  };

  const handleNextMonth = () => {
    setDate((prevDate) => {
      const newMonth = prevDate.month + 1;
      const year = newMonth > 12 ? prevDate.year + 1 : prevDate.year;
      const month = newMonth > 12 ? 1 : newMonth;
      return { year, month };
    });
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <ChevronLeft onClick={handlePreviousMonth} size={24} cursor="pointer" />
        <p>{`${date.year}년 ${date.month}월`}</p>
        <ChevronRight onClick={handleNextMonth} size={24} cursor="pointer" />
      </TitleContainer>
      {/* <p>가계부</p> */}
      <IconContainer>
        <MessageCircle size={24} />
        <Star size={24} />
        <Search size={24} />
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;

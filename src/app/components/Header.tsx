"use client";

import {
  MessageCircle,
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import { dateState } from "../atom/dateAtom";
import { useRecoilState } from "recoil";
import { addMonths, subMonths } from "date-fns";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 2rem);
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
  const [date, setDate] = useRecoilState(dateState);

  const handlePreviousMonth = () => {
    setDate((prevDate) => {
      return subMonths(prevDate, 1);
    });
  };

  const handleNextMonth = () => {
    setDate((prevDate) => {
      return addMonths(prevDate, 1);
    });
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <ChevronLeft onClick={handlePreviousMonth} size={24} cursor="pointer" />
        <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</p>
        <ChevronRight onClick={handleNextMonth} size={24} cursor="pointer" />
      </TitleContainer>
      <IconContainer>
        <MessageCircle size={24} style={{ cursor: "pointer" }} />
        <Star size={24} style={{ cursor: "pointer" }} />
        <Search size={24} style={{ cursor: "pointer" }} />
        <LogOut
          size={24}
          onClick={() => handleLogout()}
          style={{ cursor: "pointer" }}
        />
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;

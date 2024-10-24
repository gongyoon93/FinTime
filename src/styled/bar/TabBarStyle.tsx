import styled from "styled-components";

export const BottomBar = styled.nav`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const BottomBarUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BottomBarLi = styled.li`
  padding: 0 50px;
  font-size: 1.5em;
`;

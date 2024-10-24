import styled from "styled-components";

export const TopBar = styled.nav`
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const TopBarUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TopBarLi = styled.li`
  padding: 0 50px;
  font-size: 1.5em;
`;

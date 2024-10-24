import { TopBar, TopBarLi, TopBarUl } from "../styled/bar/NavBarStyle";

const NavBar = () => {
  return (
    <TopBar>
      <TopBarUl>
        <TopBarLi>메뉴</TopBarLi>
        <TopBarLi>준비</TopBarLi>
        <TopBarLi>마감</TopBarLi>
      </TopBarUl>
    </TopBar>
  );
};

export default NavBar;

import { useNavigate } from "react-router-dom";
import { BottomBar, BottomBarLi, BottomBarUl } from "../styled/bar/TabBarStyle";

const TabBar = () => {
  const navigate = useNavigate();
  return (
    <BottomBar>
      <BottomBarUl>
        <BottomBarLi onClick={() => navigate("/abook/daily")}>
          가계부
        </BottomBarLi>
        <BottomBarLi onClick={() => navigate("/abook/statis")}>
          통계
        </BottomBarLi>
        <BottomBarLi>자산</BottomBarLi>
      </BottomBarUl>
    </BottomBar>
  );
};

export default TabBar;

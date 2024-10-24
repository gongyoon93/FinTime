import { Route, Routes } from "react-router-dom";
import ABookDaily from "../pages/abook/ABookDaily";
import ABookCalendar from "../pages/abook/ABookCalendar";

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="abook">
          <Route path="daily" element={<ABookDaily />} />
          <Route path="calendar" element={<ABookCalendar />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routers;

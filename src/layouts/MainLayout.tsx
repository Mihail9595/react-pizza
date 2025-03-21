import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
            {/* динамика меняются роутеры */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

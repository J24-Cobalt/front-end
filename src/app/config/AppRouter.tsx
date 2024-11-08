import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/home";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={"/"} element={<HomePage />} />
      {/* Account Pages */}
      {/*<Route path={"/dashboard"} element={<DashboardPage />} />*/}
      {/*<Route path={"/matching"} element={< />} />*/}
      {/*<Route path={"/applications"} element={< />} />*/}
      {/*<Route path={"/applicants"} element={< />} />*/}
      {/*<Route path={"/profile"} element={< />} />*/}
    </Routes>
  );
}

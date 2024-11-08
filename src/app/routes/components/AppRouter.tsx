import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/home";
import Profile from "@pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import AccountLayout from "@features/ui/AccountSidebar/AccountLayout";
import Applications from "@pages/applications";
import Applicants from "@pages/applications";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={"/"} element={<HomePage />} />
      {/* Account Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={"/profile"} element={<Profile />} />
        {/*<Route path={"/matching"} element={< />} />*/}
        <Route path={"/applications"} element={<Applications/>} />
        <Route path={"/applicants"} element={<Applicants/>} />
        {/*<Route path={"/profile"} element={< />} />*/}
      </Route>
    </Routes>
  );
}

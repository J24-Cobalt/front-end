import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/home";
import Profile from "@pages/profile";
import ProtectedRoute from "./ProtectedRoute";
import AccountLayout from "@features/ui/AccountSidebar/AccountLayout";
import Applications from "@pages/applications";
import MatchingPage from "@pages/matching";
import CompanyProfile from "@features/profiles/selectedCompany";
import Applicants from "@pages/applicants";
import QuestionnairePage from "@pages/questionnaire";

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
        <Route path={"/matching"} element={<MatchingPage />} />
        <Route path={"/applications"} element={<Applications />} />
        <Route path={"/applicants"} element={<Applicants />} />
        <Route path={"/questionnaires"} element={<QuestionnairePage />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/user-profile" element={<CompanyProfile />} />
      </Route>
    </Routes>
  );
}

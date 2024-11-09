import CompanyProfile from "@features/profiles/CompanyProfile";
import UserProfile from "@features/profiles/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";

export default function Profile() {
  const userType = useSelector((state: RootState) => state.auth.userType);

  return userType === "company" ? <CompanyProfile /> : <UserProfile />;
}

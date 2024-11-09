import CompanyProfile from "@features/profiles/CompanyProfile";
import UserProfile from "@features/profiles/UserProfile";
//import { useAppSelector } from "@app/hooks"; // adjust import as needed
// import { selectIsCompany } from "@features/auth/authSlice"; // example selector if you have it in a slice

export default function Profile() {
  // Replace this with the actual selector from your Redux store or other state management
  //const isCompany = useAppSelector((state) => state.auth.isCompany); // adjust selector as needed
  const isCompany = false;

  return isCompany ? <CompanyProfile /> : <UserProfile />;
}

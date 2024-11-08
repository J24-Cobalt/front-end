import { Navigate, useLocation } from "react-router-dom";

//import { selectAuth } from "@features/auth/store/authSlice";
//import { useAppSelector } from "@store/index";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  //const auth = useAppSelector(selectAuth);
  const auth = true;
  const location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

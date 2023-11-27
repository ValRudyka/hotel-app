import { Navigate } from "react-router-dom";
import { useGetUser } from "../features/authentication/useGetUser";

function AuthLayout({ children }) {
  const { isAuthenticated, isLoading } = useGetUser();

  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthLayout;

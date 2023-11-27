import styled from "styled-components";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useGetUser();

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return !isAuthenticated && !isLoading ? <Navigate to="/login" /> : children;
}

export default ProtectedRoute;

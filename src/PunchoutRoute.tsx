import { Navigate } from "react-router-dom";

const PunchoutRoute = ({ children }: any) => {
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PunchoutRoute;
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./Api";

const PunchoutRoute = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("checking");

  useEffect(() => {

    const checkSession = async () => {

      const sessionId =
        localStorage.getItem("sessionId");

      if (!sessionId) {

        const expired =
          localStorage.getItem("sessionExpired");

        if (expired === "true") {
          setStatus("expired");
        } else {
          setStatus("unauthorized");
        }

        setLoading(false);
        return;
      }

      try {

        await api.get(
          `/api/cart/get/${sessionId}`
        );

        setStatus("valid");

      } catch {

        setStatus("expired");
      }

      setLoading(false);
    };

    checkSession();

  }, []);

  if (loading) {
    return null;
  }

  if (status === "expired") {
    return (
      <Navigate
        to="/session-expired"
        replace
      />
    );
  }

  if (status === "unauthorized") {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default PunchoutRoute;
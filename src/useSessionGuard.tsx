// hooks/useSessionGuard.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSessionGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const sessionId = localStorage.getItem("sessionId");

      // ❌ No session at all
      if (!sessionId) {
        navigate("/unauthorized");
        return;
      }

      try {
        const res = await fetch(`/api/cart/get/${sessionId}`);

        if (res.status === 401) {
          // 🔥 SESSION EXPIRED
          localStorage.removeItem("sessionId");
          navigate("/session-expired");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // run immediately once
    checkSession();

    // ⏱ every 30 sec
    const interval = setInterval(checkSession, 30000);

    return () => clearInterval(interval);
  }, [navigate]);
};

export default useSessionGuard;
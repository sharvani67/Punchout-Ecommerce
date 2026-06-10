export const checkSessionValidity = async (navigate) => {
  const sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    navigate("/unauthorized", { replace: true });
    return false;
  }

  try {
    const res = await fetch(`/api/supplier/validate/${sessionId}`);

    if (!res.ok) {
      const data = await res.json();

      console.log("Session invalid:", data); // DEBUG

      // ✅ REMOVE session FIRST
      localStorage.removeItem("sessionId");

      if (data.reason === "EXPIRED") {
        window.location.href = "/session-expired"; // 🔥 HARD redirect
      } else {
        window.location.href = "/unauthorized";
      }

      return false;
    }

    return true;

  } catch (err) {
    console.error(err);
    return false;
  }
};
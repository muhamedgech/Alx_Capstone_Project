import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); // ✅ Update state
    navigate("/");
  }, [navigate, setIsAuthenticated]);

  return <div>Logging you out...</div>;
};

export default Logout;

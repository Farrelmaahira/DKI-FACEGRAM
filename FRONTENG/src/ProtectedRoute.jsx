import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return navigate("/");
    }
  }, [navigate]);
  return <Outlet />;
};

export default ProtectedRoute;

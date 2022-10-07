import { Navigate, Outlet } from "react-router-dom";

import { AuthProps } from "../structs";

const ProtectedRoute = ({ isAuthorized, fallback }: AuthProps) => {
  return isAuthorized ? <Outlet /> : <Navigate to={fallback} replace />;
};

export default ProtectedRoute;

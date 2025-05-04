import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({
  isAuthenticated,
  allowedRoles,
  userRole,
  children,
}) => {
  

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(userRole))
    return (
      <h1 style={{ textAlign: "center", marginTop: "200px" }}>
        403 Not Authorized
      </h1>
    );
  return children;
};

export default RoleBasedRoute;

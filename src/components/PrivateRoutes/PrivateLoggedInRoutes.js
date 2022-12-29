import { Outlet, Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const nullValues = [null, "null", undefined];

const PrivateLoggedInRoutes = ({ children }) => {
  const userAuthenticated = useSelector((state) => state.user.user);

  let auth = { token: Boolean(nullValues.includes(userAuthenticated)) };

  return auth.token ? children : <Navigate to="/projects" />;
};

export default PrivateLoggedInRoutes;

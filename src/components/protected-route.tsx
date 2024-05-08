import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore().user;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

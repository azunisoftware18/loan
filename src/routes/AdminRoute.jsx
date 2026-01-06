import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  
  

  // 1. Login nahi hai
  // if (!isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  // 2. Login hai but admin nahi
  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // 3. Admin hai → allow
  return children;
}

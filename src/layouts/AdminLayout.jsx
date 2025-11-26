// AdminLayout.jsx
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-wrapper">
      <h2>Admin Panel</h2>
      <Outlet />
    </div>
  );
}

export default AdminLayout;

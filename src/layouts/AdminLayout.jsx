// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import SidebarNav from "../components/admin/SidebarNav";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminFooter from "../components/admin/AdminFooter";

export default function AdminLayout() {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
}

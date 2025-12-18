import { Outlet } from "react-router-dom";
import EmployeeFooter from "../components/empolyee/EmployeeFooter";
import EmployeeNavbar from "../components/empolyee/EmployeeNavbar";
import EmployeeSidebar from "../components/empolyee/EmployeeSidebar";

export default function EmployeeLayout() {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <EmployeeSidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <EmployeeNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <EmployeeFooter />
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";

// // IMPORT YOUR COMPONENTS
// import EmployeeSidebar from "../components/employee/EmployeeSidebar";
// import EmployeeNavbar from "../components/employee/EmployeeNavbar";
// import EmployeeFooter from "../components/employee/EmployeeFooter";

// export default function EmployeeLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <div className="hidden lg:block">
//         <EmployeeSidebar />
//       </div>

//       {/* MOBILE SIDEBAR */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 bg-black/40 lg:hidden"
//              onClick={toggleSidebar} />
//       )}

//       <div
//         className={`fixed z-50 lg:hidden transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <EmployeeSidebar />
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* NAVBAR */}
//         <EmployeeNavbar toggleSidebar={toggleSidebar} />

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 lg:p-6">
//           <Outlet />
//         </main>

//         {/* FOOTER */}
//         <EmployeeFooter />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Eye, Edit, Ban, PlusCircle } from "lucide-react";

export default function Borrowers() {
  const borrowers = [
    {
      id: 1,
      name: "Sohail Ahmed",
      phone: "9876543210",
      email: "sohail@example.com",
      address: "Mumbai, India",
      loans: 3,
      runningLoan: 1,
      pendingEmi: 2,
      status: "Verified",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      phone: "9123456780",
      email: "ravi@example.com",
      address: "Delhi, India",
      loans: 2,
      runningLoan: 0,
      pendingEmi: 0,
      status: "Pending",
    },
    {
      id: 3,
      name: "Neha Sharma",
      phone: "9992233411",
      email: "neha@example.com",
      address: "Pune, India",
      loans: 5,
      runningLoan: 2,
      pendingEmi: 4,
      status: "Verified",
    },
    {
      id: 4,
      name: "Aman Singh",
      phone: "8877665544",
      email: "aman@example.com",
      address: "Lucknow, India",
      loans: 1,
      runningLoan: 1,
      pendingEmi: 1,
      status: "Overdue",
    },
    {
      id: 5,
      name: "Priya Verma",
      phone: "9988776655",
      email: "priya@example.com",
      address: "Jaipur, India",
      loans: 4,
      runningLoan: 1,
      pendingEmi: 3,
      status: "Verified",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Borrowers</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <PlusCircle size={20} /> Add New Borrower
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Loans</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {borrowers.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{b.name}</td>
                <td className="p-4">{b.phone}</td>
                <td className="p-4">{b.email}</td>
                <td className="p-4">{b.address}</td>
                <td className="p-4">{b.loans}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* Action Buttons */}
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 bg-green-100 rounded-lg hover:bg-green-200">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 bg-red-100 rounded-lg hover:bg-red-200">
                      <Ban size={18} />
                    </button>

                    <button className="p-2 bg-purple-100 rounded-lg hover:bg-purple-200">
                      Loan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

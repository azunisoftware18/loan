import React, { useState } from "react";

export default function LoansTable({ loansData = [], onDeleteLoan, onEditLoan, onAddNewLoan }) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loans = loansData; // using parent state

  // 🔍 Filter + Sort Logic
  const filteredAndSortedLoans = loans
    .filter((loan) => {
      const s = searchTerm.toLowerCase();

      const matchesSearch =
        loan.borrower.toLowerCase().includes(s) ||
        loan.id.toLowerCase().includes(s) ||
        loan.type.toLowerCase().includes(s);

      const matchesStatus = statusFilter === "all" || loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "amount") {
        aValue = parseFloat(aValue.replace(/[₹,]/g, ""));
        bValue = parseFloat(bValue.replace(/[₹,]/g, ""));
      }

      return sortDirection === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Loan Portfolio</h2>

        {onAddNewLoan && (
          <button
            onClick={onAddNewLoan}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Loan
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4">Loan ID</th>
              <th className="px-6 py-4">Borrower</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredAndSortedLoans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{loan.id}</td>
                <td className="px-6 py-4">{loan.borrower}</td>
                <td className="px-6 py-4">{loan.amount}</td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                    {loan.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => onEditLoan(loan)}
                    className="text-yellow-600 mx-2 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteLoan(loan.id)}
                    className="text-red-600 mx-2 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {!filteredAndSortedLoans.length && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

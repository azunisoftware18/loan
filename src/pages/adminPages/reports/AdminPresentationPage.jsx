import React, { useState } from "react";

const AVAILABLE_PAGES = [
  { id: "intro", label: "Introduction" },
  { id: "process", label: "Process Explanation" },
  { id: "documents", label: "Documents Required" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "final", label: "Final Instructions" },
];

export default function CreatePresentation() {
  const [presentation, setPresentation] = useState({
    title: "",
    description: "",
    employee: "",
    deadline: "",
    priority: "Medium",
    pages: {},
  });

  // checkbox handle
  const handlePageToggle = (pageId) => {
    setPresentation((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: prev.pages[pageId]
          ? null
          : { heading: "", content: "" },
      },
    }));
  };

  // page content handle
  const handlePageChange = (pageId, field, value) => {
    setPresentation((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [pageId]: {
          ...prev.pages[pageId],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = () => {
    console.log("Presentation Data:", presentation);
    alert("Presentation Assigned Successfully ✅");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Create Presentation (Checkbox Pages)
      </h1>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Presentation Title"
          className="border p-3 rounded"
          onChange={(e) =>
            setPresentation({ ...presentation, title: e.target.value })
          }
        />
        <input
          placeholder="Assign To (Employee Name)"
          className="border p-3 rounded"
          onChange={(e) =>
            setPresentation({ ...presentation, employee: e.target.value })
          }
        />
        <input
          type="date"
          className="border p-3 rounded"
          onChange={(e) =>
            setPresentation({ ...presentation, deadline: e.target.value })
          }
        />
        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setPresentation({ ...presentation, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <textarea
        placeholder="Overall Instructions for Employee"
        className="border p-3 rounded w-full mt-4"
        rows={3}
        onChange={(e) =>
          setPresentation({ ...presentation, description: e.target.value })
        }
      />

      {/* Pages with Checkbox */}
      <h2 className="text-xl font-semibold mt-6 mb-3">
        Select Presentation Pages
      </h2>

      {AVAILABLE_PAGES.map((page) => (
        <div key={page.id} className="mb-4">
          <label className="flex items-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={!!presentation.pages[page.id]}
              onChange={() => handlePageToggle(page.id)}
            />
            {page.label}
          </label>

          {/* Page content (only if checked) */}
          {presentation.pages[page.id] && (
            <div className="ml-6 mt-2 border rounded p-4 bg-gray-50">
              <input
                placeholder={`${page.label} Heading`}
                className="border p-2 rounded w-full mb-2"
                onChange={(e) =>
                  handlePageChange(page.id, "heading", e.target.value)
                }
              />
              <textarea
                placeholder={`${page.label} Content`}
                className="border p-2 rounded w-full"
                rows={3}
                onChange={(e) =>
                  handlePageChange(page.id, "content", e.target.value)
                }
              />
            </div>
          )}
        </div>
      ))}

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg"
        >
          Assign Presentation
        </button>
      </div>
    </div>
  );
}
    
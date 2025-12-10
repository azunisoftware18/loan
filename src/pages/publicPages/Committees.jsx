

import React, { useState } from "react";
import { 
  ChevronDown, 
  Users, 
  Briefcase, 
  FileCheck, 
  DollarSign, 
  Shield, 
  Zap   
} from "lucide-react";


export default function Committees() {
  // Color variables for consistency
  const PRIMARY_COLOR = "text-blue-600";
  const PRIMARY_BG_LIGHT = "bg-blue-50";
  const LIGHT_BG = "bg-gray-50";

  // Data extracted from the image, structured for the accordion
  const committeesData = [
    {
      name: "Audit Committee",
      icon: DollarSign,
      members: [
        { name: "Mr. Arjun Dan Ratnoo", designation: "Chairman" },
        { name: "Mr. Lamyan Ercost", designation: "Member" },
        { name: "Mr. Ishaan Mittal", designation: "Member" },
      ],
    },
    {
      name: "Nomination and Remuneration Committee",
      icon: Briefcase,
      members: [
        { name: "Mr. Arjun Dan Ratnoo", designation: "Chairman" },
        { name: "Mr. Sathyan David", designation: "Member" },
        { name: "Mr. Aditya Deepak Parekh", designation: "Member" },
      ],
    },
    {
      name: "Corporate Social Responsibility Committee",
      icon: Users,
      members: [
        { name: "Mr. Mohit Sahney", designation: "Chairman" },
        { name: "Mrs. Sunita Sahney", designation: "Member" },
        { name: "Mr. Arjun Dan Ratnoo", designation: "Member" },
      ],
    },
    {
      name: "Risk Management Committee",
      icon: Shield,
      members: [
        { name: "Mr. Arjun Dan Ratnoo", designation: "Chairman" },
        { name: "Mr. Ishaan Mittal", designation: "Member" },
        { name: "Mrs. Sunita Sahney", designation: "Member" },
        { name: "Mr. Ravi Sharma", designation: "Member" },
      ],
    },
    {
      name: "Asset Liability Management Committee",
      icon: DollarSign,
      members: [
        { name: "Mr. Mohit Sahney", designation: "Chairman" },
        { name: "Mrs. Sunita Sahney", designation: "Member" },
        { name: "Mr. Ravi Sharma", designation: "Member" },
        { name: "Mr. Rakesh Talu", designation: "Member" },
      ],
    },
    {
      name: "IT Strategy Committee",
      icon: Zap,
      members: [
        { name: "Mr. Arjun Dan Ratnoo", designation: "Chairman" },
        { name: "Mr. Mohit Sahney", designation: "Member" },
        { name: "Mrs. Sunita Sahney", designation: "Member" },
        { name: "Mr. Arpit Gupta", designation: "Member" },
      ],
    },
    {
      name: "Consumer Protection Committee",
      icon: FileCheck,
      members: [
        { name: "Mr. Arpit Gupta", designation: "Chairperson" },
        { name: "Mr. Pooja Godara", designation: "Member" },
        { name: "Mr. Vipul Santo", designation: "Member" },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Set the first committee as open by default

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`py-16 px-4 ${LIGHT_BG} font-sans min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        
        {/* ===== Header Section ===== */}
        <div className="text-center mb-12">
          <Users className={`w-10 h-10 mx-auto mb-3 ${PRIMARY_COLOR}`} />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Committees of the <span className={PRIMARY_COLOR}>Board</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Governing bodies ensuring robust corporate governance and specialized oversight.
          </p>
        </div>

        {/* ===== Accordion Section ===== */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          {committeesData.map((committee, index) => (
            <div key={index} className="border-b border-gray-200 last:border-b-0">
              
              {/* Accordion Header */}
              <button
                className={`flex justify-between items-center w-full p-5 text-left transition duration-300 
                ${activeIndex === index ? `${PRIMARY_BG_LIGHT} text-blue-800` : 'hover:bg-gray-50 text-gray-900'}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center">
                  <committee.icon className={`w-6 h-6 mr-3 ${activeIndex === index ? PRIMARY_COLOR : 'text-gray-500'}`} />
                  <span className="text-xl font-bold">{committee.name}</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180 text-blue-600' : 'text-gray-500'}`} 
                />
              </button>

              {/* Accordion Content */}
              {activeIndex === index && (
                <div className="p-5 pt-0 bg-white">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">S.No.</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">Name of Member</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {committee.members.map((member, mIndex) => (
                          <tr key={mIndex} className="hover:bg-blue-50/50 transition">
                            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">{mIndex + 1}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{member.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { User, Briefcase, Award } from "lucide-react";

export default function Directors() {
  // Color variables for consistency
  const PRIMARY_COLOR = "text-blue-600";
  const PRIMARY_BG_LIGHT = "bg-blue-100";
  const LIGHT_BG = "bg-gray-50";

  const directorsData = [
    { 
      name: "Mr. Mohit Sahney", 
      title: "Managing Director & Chief Executive Officer", 
      type: "Executive",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" // Placeholder URL
    },
    { 
      name: "Mrs. Sunita Sahney", 
      title: "Executive Director", 
      type: "Executive",
      image: "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" // Placeholder URL
    },
    { 
      name: "Mr. Arjun Dan Ratnoo", 
      title: "Independent Director", 
      type: "Independent",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1176" // Placeholder URL
    },
    { 
      name: "Mr. Sathyan David", 
      title: "Independent Director", 
      type: "Independent",
      image: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" // Placeholder URL
    },
    { 
      name: "Mr. GV Ravishankar", 
      title: "Nominee Director", 
      type: "Nominee",
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" // Placeholder URL
    },
    { 
      name: "Mr. Aditya Deepak Parekh", 
      title: "Nominee Director", 
      type: "Nominee",
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" // Placeholder URL
    },
    { 
      name: "Mr. Ishaan Mittal", 
      title: "Nominee Director", 
      type: "Nominee",
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687" // Placeholder URL
    },
   
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Executive':
        return 'text-red-600 bg-red-100';
      case 'Independent':
        return 'text-green-600 bg-green-100';
      case 'Nominee':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div id="board-of-directors" className={`py-16 px-4 ${LIGHT_BG} font-sans`}>
      <div className="max-w-7xl mx-auto">
        
        {/* ===== Header Section ===== */}
        <div className="text-center mb-12">
          <Award className={`w-10 h-10 mx-auto mb-3 ${PRIMARY_COLOR}`} />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Our <span className={PRIMARY_COLOR}>Board of Directors</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The visionary leaders guiding Finova's mission and growth.
          </p>
        </div>

        {/* ===== Directors Grid ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {directorsData.map((director, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.02] group"
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={director.image} 
                  alt={director.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Overlay/Accent */}
                <div className={`absolute inset-0 bg-blue-600 opacity-0 transition duration-300 group-hover:opacity-10`}></div>
              </div>
              
              {/* Details Section */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                  {director.name}
                </h3>
                <p className="text-sm font-semibold text-gray-700">
                  {director.title}
                </p>
                
                {/* Director Type Badge */}
                <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full font-bold uppercase ${getTypeColor(director.type)}`}>
                  {director.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
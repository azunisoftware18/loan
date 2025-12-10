import React, { useState } from 'react';
import { Briefcase, MapPin, Search, ChevronDown, CheckCircle, Zap, TrendingUp, Download } from 'lucide-react';

export default function ApplyNow() {
    // Color variables for consistency
    const PRIMARY_COLOR = "text-blue-600";
    const PRIMARY_BG = "bg-blue-600";
    const LIGHT_BG = "bg-gray-50";
    const ACCENT_BG = "bg-blue-50";

    // Data for Application Steps 
    const applicationSteps = [
        { id: '01', title: 'Apply', icon: Briefcase, description: 'No cupcakes needed. Or rap CVs or resumes either. Simply make it easy for us to see how great you are.' },
        { id: '02', title: 'Interview', icon: Zap, description: 'Come prepared, ask us questions, and be sincere. Interviews are about finding a great match, for both sides.' },
        { id: '03', title: 'Decision', icon: CheckCircle, description: 'If you like what you see, and we like what we hear, we’ll officially invite you to join the band.' },
    ];

    // Dummy Data for Job Openings 
    const [openings, setOpenings] = useState([
        { 
            title: "Relationship Officer - Angul", 
            jobId: "JOB481", 
            location: "Angul", 
            experience: '-', 
            function: "Sales",
            link: "#"
        },
        // Add more job data here
        { 
            title: "Branch Manager", 
            jobId: "JOB502", 
            location: "Jaipur", 
            experience: '5-7 years', 
            function: "Branch Operations",
            link: "#"
        },
    ]);

    // Dummy Data for Filters
    const preferredLocations = ['Angul', 'Jaipur', 'Gurugram', 'All Locations'];
    const experienceLevels = ['0-2 years', '3-5 years', '5+ years', 'Any Experience'];

    // State for filters (You would implement actual filtering logic here)
    const [selectedLocation, setSelectedLocation] = useState(preferredLocations[3]);
    const [selectedExperience, setSelectedExperience] = useState(experienceLevels[3]);

    return (
        <div className={`py-16 px-4 ${LIGHT_BG} font-sans min-h-screen`}>
            <div className="max-w-7xl mx-auto">
                
                {/* ===== Header Section ===== */}
                <div className="text-center mb-12 bg-white p-8 rounded-xl shadow-lg border-b-4 border-blue-600">
                    <TrendingUp className={`w-12 h-12 mx-auto mb-3 ${PRIMARY_COLOR}`} />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                        Transform Careers, & Build Future, <span className={PRIMARY_COLOR}>WITH US!!</span>
                    </h1>
                </div>

                {/* ===== Job Search and Filters  ===== */}
                <div className="mb-12">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
                        CURRENT VACANCIES
                    </h2>
                    <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        
                        {/* Preferred Location Filter */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
                            <select 
                                value={selectedLocation} 
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                            >
                                {preferredLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Experience Filter */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
                            <select 
                                value={selectedExperience} 
                                onChange={(e) => setSelectedExperience(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none"
                            >
                                {experienceLevels.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Search Button */}
                        <button 
                            className={`mt-1 md:col-span-1 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${PRIMARY_BG} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            <Search className="w-4 h-4 mr-2" /> SEARCH
                        </button>
                        
                        {/* Download CV/Upload CV Section  */}
                        <div className="md:col-span-1 flex items-center justify-end">
                            <div className="relative">
                                <button className={`flex justify-center items-center px-4 py-2 border border-blue-400 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50`}>
                                    <Download className="w-4 h-4 mr-2"/> DROP CV
                                </button>
                                {/* The full upload box can go here if needed */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Job Listings & Apply Button  ===== */}
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 mb-16">
                    {openings.map((job, index) => (
                        <div key={index} className="p-5 border-b border-gray-100 last:border-b-0 transition duration-200 hover:bg-gray-50/50">
                            <div className="flex justify-between items-center flex-wrap">
                                
                                {/* Job Details */}
                                <div className="flex-grow min-w-[200px] mb-2 md:mb-0">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {job.title}
                                        <span className={`ml-2 text-xs font-semibold ${PRIMARY_COLOR}`}>({job.jobId})</span>
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Job function: {job.function} | Exp: {job.experience}
                                    </p>
                                </div>
                                
                                {/* Apply Button */}
                                <a 
                                    href={job.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center text-sm font-semibold text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition" // Using red for Apply Here as seen in original image
                                >
                                    APPLY HERE
                                </a>
                            </div>
                        </div>
                    ))}
                    {openings.length === 0 && (
                        <p className="p-5 text-center text-gray-500">No vacancies match your criteria.</p>
                    )}
                </div>

                {/* ===== Application ===== */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-blue-600 inline-block pb-1">
                        Our Application Process
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {applicationSteps.map((step, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                                <div className={`mx-auto w-16 h-16 rounded-full ${ACCENT_BG} flex items-center justify-center mb-4 border-4 border-white shadow-md`}>
                                    <step.icon className={`w-8 h-8 ${PRIMARY_COLOR}`} />
                                </div>
                                <span className={`block text-3xl font-extrabold mb-3 ${PRIMARY_COLOR}`}>{step.id}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
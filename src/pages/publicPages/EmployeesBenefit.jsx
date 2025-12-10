// EmployeesBenefit.jsx (Designed to match the Blue/Dark Blue FinTech Theme)

import React from 'react';
import { Shield, Heart, Zap, DollarSign, Briefcase, TrendingUp, Award } from 'lucide-react';

export default function EmployeesBenefit() {
    // Color variables for consistency
    const PRIMARY_COLOR = "text-blue-600";
    const PRIMARY_BG = "bg-blue-600";
    const LIGHT_BG = "bg-gray-50";

    const benefitsData = [
        { 
            title: "Health & Wellness Coverage", 
            icon: Heart, 
            description: "Comprehensive medical insurance for employees and their families, ensuring peace of mind and access to quality healthcare.",
        },
        { 
            title: "Financial Security (PF & Gratuity)", 
            icon: DollarSign, 
            description: "Robust retirement and savings plans, including Provident Fund (PF) and Gratuity benefits, to secure your financial future.",
        },
        { 
            title: "Professional Development", 
            icon: TrendingUp, 
            description: "Access to ongoing training, skill development programs, and certifications to help you advance your career and grow professionally.",
        },
        { 
            title: "Work-Life Balance", 
            icon: Briefcase, 
            description: "Generous paid time off, flexible work arrangements where applicable, and support for maintaining a healthy balance between work and personal life.",
        },
        { 
            title: "Recognition & Rewards", 
            icon: Award, 
            description: "Performance-based bonuses, awards, and recognition programs that celebrate your achievements and contributions to the company's success.",
        },
        { 
            title: "Employee Assistance Program (EAP)", 
            icon: Shield, 
            description: "Confidential counseling and support services for personal or professional challenges, promoting mental well-being.",
        },
    ];

    return (
        <div className={`py-16 px-4 ${LIGHT_BG} font-sans min-h-screen`}>
            <div className="max-w-7xl mx-auto">
                
                {/* ===== Header Section ===== */}
                <div className="text-center mb-12">
                    <Zap className={`w-10 h-10 mx-auto mb-3 ${PRIMARY_COLOR}`} />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
                        Employee <span className={PRIMARY_COLOR}>Benefits</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We invest in our people. Discover the comprehensive benefits package designed for your growth and well-being.
                    </p>
                </div>

                {/* ===== Benefits Grid ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefitsData.map((benefit, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-200 
                            transition duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <benefit.icon className={`w-10 h-10 mb-4 ${PRIMARY_COLOR}`} />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                            <a href="#" className={`mt-3 inline-block font-semibold text-sm ${PRIMARY_COLOR} hover:text-blue-700`}>
                                Learn More
                            </a>
                        </div>
                    ))}
                </div>

                {/* ===== CTA Section ===== */}
                <div className={`mt-16 p-8 rounded-xl text-center shadow-xl ${PRIMARY_BG}`}>
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Ready to Join the Finova Family?
                    </h2>
                    <p className="text-lg text-blue-200 mb-6">
                        Explore our current job openings and start your journey with us.
                    </p>
                    <a 
                        href="#" // Link to your careers page
                        className="inline-flex items-center text-lg font-bold bg-white text-blue-600 px-8 py-3 rounded-full 
                        hover:bg-gray-100 transition shadow-lg"
                    >
                        View Open Positions
                    </a>
                </div>

            </div>
        </div>
    );
}
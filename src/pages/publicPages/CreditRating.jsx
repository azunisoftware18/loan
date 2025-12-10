import React from 'react';
import { Award, TrendingUp } from 'lucide-react';

const creditRatingData = [
  { 
    srNo: 1, 
    agency: "Acuite Ratings & Research Limited", 
    instrument: "Long term Bank Facilities", 
    rating: "Acuite A+/Positive" 
  },
  { 
    srNo: 2, 
    agency: "CARE Ratings Limited", 
    instrument: "Long term Bank Facilities", 
    rating: "CARE A/Stable" 
  },
  { 
    srNo: 3, 
    agency: "CARE Ratings Limited", 
    instrument: "Bank Overdraft", 
    rating: "CARE A/Stable" 
  },
  { 
    srNo: 4, 
    agency: "CRISIL Ratings Ltd.", 
    instrument: "Securities/Bonds", 
    rating: "CRISIL A/Stable" 
  },
];

const CreditRating = () => {
  // Theme colors
  const PRIMARY_COLOR_CLASS = "text-blue-600";
  const PRIMARY_BG_CLASS = "bg-blue-600";
  const LIGHT_BG_CLASS = "bg-gray-50";

  return (
    <div className={`font-sans min-h-screen py-16 px-4 ${LIGHT_BG_CLASS}`}>
      <div className="container mx-auto max-w-6xl">
        
        {/* ===== Header Section ===== */}
        <div className="text-center mb-12">
            <Award className={`w-12 h-12 mx-auto mb-3 ${PRIMARY_COLOR_CLASS}`} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Our Credit <span className={PRIMARY_COLOR_CLASS}>Ratings</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparency and trust reflected in our consistent ratings from leading agencies.
            </p>
        </div>

        {/* ===== Table Container (Modern Blue Theme) ===== */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            
            <div className="min-w-full">
                {/* Table Header (Blue Theme) */}
                <div className={`grid grid-cols-1 md:grid-cols-4 ${PRIMARY_BG_CLASS} text-white font-bold text-sm md:text-base p-4 uppercase tracking-wider`}>
                    <div className="text-left hidden md:block w-1/12">Sr. No.</div>
                    <div className="col-span-1 md:col-span-1">Name of Credit Rating Agency</div>
                    <div className="col-span-1 md:col-span-1">Type of Instrument</div>
                    <div className="col-span-1 md:col-span-1">Rating</div>
                </div>

                {/* Table Body */}
                {creditRatingData.map((item, index) => (
                    <div
                        key={index}
                        // Odd/Even row styling
                        className={`grid grid-cols-1 md:grid-cols-4 items-center px-4 py-4 border-b border-gray-100 text-gray-800 text-sm md:text-base transition duration-200 hover:bg-blue-50/50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                    >
                        {/* Sr. No. */}
                        <div className="text-left font-semibold hidden md:block w-1/12">
                            {item.srNo}
                        </div>

                        {/* Mobile view fallback: show Sr No and Agency together */}
                        <div className="md:hidden font-bold text-gray-900 mb-1">
                            {item.srNo}. {item.agency}
                        </div>
                        
                        {/* Agency Name (Desktop) */}
                        <div className="hidden md:block">
                            {item.agency}
                        </div>

                        {/* Instrument Type */}
                        <div className="py-1 md:py-0">
                            <span className="md:hidden font-semibold mr-1">Instrument:</span> {item.instrument}
                        </div>

                        {/* Rating */}
                        <div className="font-extrabold py-1 md:py-0">
                            <span className="md:hidden font-semibold mr-1">Rating:</span> <span className={PRIMARY_COLOR_CLASS}>{item.rating}</span>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Additional Information/Disclaimer */}
        <div className="mt-8 text-center p-4 rounded-lg border border-blue-200 bg-blue-50/70">
            <p className="text-sm text-gray-700 flex items-start justify-center">
                <TrendingUp className={`w-5 h-5 mr-2 mt-0.5 ${PRIMARY_COLOR_CLASS}`}/> 
                The ratings reflect our strong financial position and robust management practices.
            </p>
        </div>

      </div>
    </div>
  );
};

export default CreditRating;
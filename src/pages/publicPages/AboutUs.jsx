
import { Info, UserCheck, Briefcase, Users } from "lucide-react";

export default function AboutUs() {
  // Color variables for consistency
  const PRIMARY_COLOR = "text-blue-600";
  const PRIMARY_BUTTON_COLOR = "bg-blue-600 hover:bg-blue-700";
  const BORDER_COLOR = "border-blue-500";
  const LIGHT_BG = "bg-blue-50";

  // Data for the 'Key Pillars' section to break up the large text block
  const keyPillars = [
    { icon: Briefcase, title: "MSME Focus", description: "Empowering micro, small, and medium enterprises to drive economic growth." },
    { icon: UserCheck, title: "Customer-Centric", description: "Driven by integrity and transparency to build long-lasting client relationships." },
    { icon: Users, title: "Expert Backing", description: "Supported by renowned investors like Peak XV Partners and Norwest Venture Partners." },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-16">
      {/* ===== Heading and Introduction ===== */}
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl font-extrabold text-gray-900 mb-4`}>
          Our <span className={PRIMARY_COLOR}>Story</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Revolutionizing credit delivery to the unorganized, unreached, and unserved segments of the population since 2015.
        </p>
      </div>
      
      {/* --- */}

      {/* ===== Main Content: Image and Detailed Text ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 items-start">
        
        {/* Left Image */}
        <div className="flex justify-center md:order-2">
          <img
            src="https://plus.unsplash.com/premium_photo-1675055730240-96a4ed84e482?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627" 
            alt="About Finova Capital"
            className="rounded-xl shadow-2xl w-full max-w-lg object-cover border-4 border-blue-100"
          />
        </div>

        {/* Right Text - Detailed Information */}
        <div className="md:order-1 text-gray-700 leading-relaxed space-y-6">
          <h3 className={`text-2xl font-bold text-gray-900 flex items-center mb-4`}>
            <Info className={`w-6 h-6 mr-3 ${PRIMARY_COLOR}`} />
            Welcome to Finova Capital
          </h3>

          <p className="border-l-4 pl-4 border-blue-400">
            Founded in **2015** by **Mr. Mohit Sahney** and **Mrs. Sunita Sahney**, Finova Capital is a leading **NBFC** licensed by the Reserve Bank of India. Our mission is to support micro, small, and medium enterprises (**MSMEs**), recognizing their pivotal role in the Indian economy.
          </p>

          <p>
            Operating across **16 states**, with over **400 branches** and continuously expanding, Finova Capital is a young and dynamic organization driven to provide financial services and solutions that enable growth.
          </p>

          <div className={`${LIGHT_BG} p-6 rounded-lg shadow-inner`}>
            <p className="font-semibold text-gray-800 mb-2">
              Investor Trust
            </p>
            <p className="text-sm text-gray-700">
              We are proudly backed by renowned investors such as **Peak XV Partners, Norwest Venture Partners, Faering Capital**, and others. Their faith in our vision fuels our determination to make a meaningful impact.
            </p>
          </div>

          <p>
            We offer a wide range of financial products and services tailored to the unique needs of MSMEs, including working capital loans, machinery loans, and business loans. Our **efficient processes**, **innovative technology**, and **personalized approach** ensure quick and hassle-free access to funds.
          </p>

          <p className={`font-semibold ${PRIMARY_COLOR} text-lg`}>
            Join us on our journey to empower MSMEs and discover the Finova advantage today!
          </p>

          <button className={`mt-4 text-white px-6 py-3 rounded-lg font-semibold transition ${PRIMARY_BUTTON_COLOR} shadow-md`}>
            Meet Our Founders
          </button>
        </div>
      </div>
      
      {/* --- */}

      {/* ===== Key Pillars / Summary Boxes Section ===== */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-center text-2xl font-bold text-gray-900 mb-8">Our Core Strengths</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {keyPillars.map((pillar, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <pillar.icon className={`w-8 h-8 mb-3 ${PRIMARY_COLOR}`} />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{pillar.title}</h4>
              <p className="text-gray-600 text-sm">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
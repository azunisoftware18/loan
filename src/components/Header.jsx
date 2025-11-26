import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, MapPin, Clock } from "lucide-react";
import ApplyLoanModal from "./Form/ApplyLoanModal";
import LoginPopup from "./LoginPopup";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const handleApplyLoanModal = () => {
    setShowModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileSubmenu(null);
  };

  const navigationItems = {
    "About Company": [
      { name: "About Us", link: "/about-us" },
      { name: "Opportunity", link: "/opportunity" },
      { name: "Our Method", link: "/our-method" },
      { name: "Vision And Mission", link: "/vision-and-mission" },
      { name: "Policies", link: "/policies" },
      { name: "Board Of Directors", link: "/board-of-directors" },
      { name: "Key Managerial Personnel", link: "/key-managerial-personnel" },
      { name: "Our Investors", link: "/our-investors" },
    ],
    "Investor Relation": [
      { name: "Financial Information", link: "/financial-information" },
      { name: "Annual Report", link: "/annual-report" },
      { name: "Committees", link: "/committees" },
      { 
        name: "Corporate Governance", 
        link: "/corporate-governance",
        submenu: [
          { name: "Policies and Codes", link: "/policies-and-codes" },
          { name: "SARFAESI", link: "/sarfaesi" },
          { name: "Credit Rating", link: "/credit-rating" },
        ],
      },
      { 
        name: "Shareholder Information", 
        link: "/shareholder-information",
        submenu: [
          { name: "Notice Of AGM/EGM/Postal ballot", link: "/notice-Of-ballot" },
          { name: "Disclosures under Regulation 62 of LODR", link: "/under-regulation" },
          { name: "Public Disclosure under Liquidity Risk", link: "/public-disclosure-under-liquidity-risk" },
          { name: "Other Disclosures", link: "/others-disclosures" },
        ],
      },
      { name: "CSR", link: "/csr" },
    ],
    "Media": [
      { name: "News And Media", link: "/News-And-Media" },
      { name: "SARFAESI Auction Notices", link: "/SARFAESI-Auction-Notices" },
    ],
    "Career": [
      { name: "Finova HR", link: "/Finova-HR" },
      { name: "Welcome to Finova", link: "/Welcome-to-Finova" },
      { name: "Employees Benefit", link: "/Employees-Benefit" },
      { name: "Join the Finova Family", link: "/Join-the-Finova-Family" },
      { name: "Apply Now", link: "/Apply-Now" },
    ],
  };

  // Top info bar for desktop
  const TopInfoBar = () => (
  <div className="hidden lg:flex bg-blue-900 text-white text-sm py-2 px-6 justify-between items-center">
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Phone className="w-4 h-4" />
        <span>+1-800-FINOVA</span>
      </div>
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4" />
        <span>Jaipur, Rajasthan</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4" />
        <span>Mon-Fri: 9AM-6PM</span>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      {/* Login button removed from here - only Branch Locator remains */}
      <Link to="/branch-locator" className="hover:text-blue-200 transition">Branch Locator</Link>
    </div>
  </div>
);

  // Desktop dropdown menu
  const DesktopDropdownMenu = ({ items }) => {
    return (
      <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transform -translate-y-2 transition-all duration-300 ease-out z-50">
        <div className="p-3">
          {items.map((item, i) => (
            <div key={i} className="relative group/item">
              <Link
                to={item.link}
                className={`flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg ${
                  item.submenu ? "font-semibold" : ""
                }`}
              >
                <span>{item.name}</span>
                {item.submenu && <ChevronDown className="w-4 h-4 transform -rotate-90" />}
              </Link>
              
              {item.submenu && (
                <div className="absolute left-full top-0 ml-1 w-72 bg-white border border-gray-200 shadow-2xl rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transform -translate-x-2 transition-all duration-300 ease-out z-50">
                  <div className="p-3">
                    {item.submenu.map((subItem, subI) => (
                      <Link
                        key={subI}
                        to={subItem.link}
                        className="block px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all rounded-lg"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tablet dropdown menu
  const TabletDropdownMenu = ({ items, title }) => {
    return (
      <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 shadow-2xl rounded-lg z-50">
        <div className="p-4">
          <h4 className="font-bold text-gray-900 mb-3 text-lg border-b pb-2 text-blue-600">
            {title}
          </h4>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i}>
                <Link
                  to={item.link}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all border-l-4 border-transparent hover:border-blue-500"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </div>
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-2 border-l-2 border-blue-100 pl-4">
                    {item.submenu.map((subItem, subI) => (
                      <Link
                        key={subI}
                        to={subItem.link}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Mobile menu with submenu support
  const MobileMenu = () => {
    if (mobileSubmenu) {
      const items = navigationItems[mobileSubmenu];
      return (
        <div className="space-y-3">
          {/* Back button */}
          <button
            onClick={() => setMobileSubmenu(null)}
            className="flex items-center space-x-2 text-blue-600 font-semibold mb-4 p-3 bg-blue-50 rounded-lg"
          >
            <ChevronDown className="w-4 h-4 transform rotate-90" />
            <span>Back to Menu</span>
          </button>

          <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">{mobileSubmenu}</h3>
          
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i}>
                {item.submenu ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition text-sm font-semibold flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className="block px-4 py-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Main navigation links */}
        <div className="space-y-2">
          <Link
            to="/"
            className="block py-4 px-4 bg-gradient-to-r from-blue-50 to-white rounded-xl hover:from-blue-100 hover:to-blue-50 transition-all font-semibold text-gray-900 border border-blue-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block py-4 px-4 bg-gradient-to-r from-blue-50 to-white rounded-xl hover:from-blue-100 hover:to-blue-50 transition-all font-semibold text-gray-900 border border-blue-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>
        </div>

        {/* Dropdown sections */}
        {Object.entries(navigationItems).map(([title, items]) => (
          <div key={title} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setMobileSubmenu(title)}
              className="w-full text-left px-4 py-4 bg-white hover:bg-blue-50 transition-all font-semibold text-gray-900 flex items-center justify-between"
            >
              <span>{title}</span>
              <ChevronDown className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        ))}

        <Link
          to="/contact"
          className="block py-4 px-4 bg-gradient-to-r from-blue-50 to-white rounded-xl hover:from-blue-100 hover:to-blue-50 transition-all font-semibold text-gray-900 border border-blue-100 text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Top Info Bar */}
      <TopInfoBar />

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Home page link */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-blue-700">Finova Capital</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Financial Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation (1024px and above) */}
            <nav className="hidden xl:flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all font-medium rounded-lg hover:bg-blue-50"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all font-medium rounded-lg hover:bg-blue-50"
              >
                Products
              </Link>

              {/* Desktop Dropdown Menus */}
              {Object.entries(navigationItems).map(([title, items]) => (
                <div key={title} className="relative group">
                  <button className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition-all font-medium rounded-lg hover:bg-blue-50">
                    <span>{title}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  <DesktopDropdownMenu items={items} />
                </div>
              ))}

              <Link 
                to="/contact" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all font-medium rounded-lg hover:bg-blue-50"
              >
                Contact Us
              </Link>
            </nav>

            {/* Tablet Navigation (768px - 1279px) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              <Link to="/" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50">
                Home
              </Link>
              <Link to="/products" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50">
                Products
              </Link>

              {/* Tablet Dropdown Menus */}
              {Object.entries(navigationItems).map(([title, items]) => (
                <div key={title} className="relative">
                  <button 
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50"
                    onClick={() => setActiveDropdown(activeDropdown === title ? null : title)}
                  >
                    <span>{title}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${
                      activeDropdown === title ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === title && (
                    <TabletDropdownMenu items={items} title={title} />
                  )}
                </div>
              ))}

              <Link to="/contact" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-all rounded-lg hover:bg-blue-50">
                Contact Us
              </Link>
            </nav>

            {/* CTA Buttons - YAHAN PAR CHANGE KIYA HAI */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Login Button */}
              <button
                onClick={handleLoginClick}
                className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-all font-semibold"
              >
                Login
              </button>
              
              {/* Apply For Loan Button */}
              <button
                onClick={handleApplyLoanModal}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                Apply For Loan
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs bg-opacity-50">
          <div className="fixed top-0 left-0 w-4/5 sm:w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Header with Home link */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Finova Capital</h2>
                    <p className="text-blue-100 text-sm">Financial Solutions</p>
                  </div>
                </Link>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleApplyLoanModal}
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all text-center"
                >
                  Apply For Loan
                </button>
                <button
                  onClick={handleLoginClick}
                  className="w-full border border-white text-white py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-all text-center"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Navigation Content */}
            <div className="p-6">
              <MobileMenu />
            </div>

            {/* Footer Info */}
            <div className="p-6 border-t border-gray-200">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1-800-FINOVA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jaipur, Rajasthan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for tablet dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 lg:block xl:hidden bg-black bg-opacity-10"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Modals */}
      {showModal && <ApplyLoanModal onClose={closeModal} />}
      {showLoginPopup && <LoginPopup isOpen={showLoginPopup} onClose={closeLoginPopup} />}
    </>
  );
} 
// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

/* -------------------------------
   PUBLIC WEBSITE PAGES
-------------------------------- */
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import OurMethod from "./pages/OurMethod.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Opportunity from "./pages/Opportunity.jsx";
import VisionAndMission from "./pages/VisionAndMission.jsx";
import Policies from "./pages/Policies.jsx";
import BoardOfDirectors from "./pages/BoardOfDirectors.jsx";
import KeyManagerialPersonnel from "./pages/KeyManagerialPersonnel.jsx";
import OurInvestors from "./pages/OurInvestors.jsx";
import FinancialInformation from "./pages/FinancialInformation.jsx";
import AnnualReport from "./pages/AnnualReport.jsx";
import Committees from "./pages/Committees.jsx";
import CorporateGovernance from "./pages/CorporateGovernance.jsx";
import Shareholderinformation from "./pages/Shareholderinformation.jsx";
import CSR from "./pages/CSR.jsx";
import NewsAndMedia from "./pages/NewsAndMedia.jsx";
import FinovaHR from "./pages/FinovaHR.jsx";
import WelcometoFinova from "./pages/WelcometoFinova.jsx";
import EmployeesBenefit from "./pages/EmployeesBenefit.jsx";
import JointheFinovaFaimily from "./pages/JointheFinovaFaimily.jsx";
import ApplyNow from "./pages/ApplyNow.jsx";
import PoliciesAndCodes from "./pages/PoliciesAndCodes.jsx";
import SARFAESI from "./pages/SARFAESI.jsx";
import CreditRating from "./pages/CreditRating.jsx";
import NoticeOfBallot from "./pages/NoticeOfBallot.jsx";
import UnderRegulation from "./pages/UnderRegulation.jsx";
import PublicDisclosureUnderLiquidityRisk from "./pages/PublicDisclosureUnderLiquidityRisk.jsx";
import OtherDisclosures from "./pages/OtherDisclosures.jsx";
import SarfaesiAuctionNotices from "./pages/SarfaesiAuctionNotices.jsx";

/* -------------------------------
   ADMIN PAGES  
-------------------------------- */

import Dashboard from "./pages/adminPages/Dashboard.jsx";
import Los from "./pages/adminPages/Los.jsx";
import LoanRequests from "./pages/adminPages/LoanRequests.jsx";
import Borrowers from "./pages/adminPages/Borrowers.jsx";
import Accounting from "./pages/adminPages/Accounting.jsx";
import Reports from "./pages/adminPages/Reports.jsx";
import Configuration from "./pages/adminPages/Configuration.jsx";
import AdminRoles from "./pages/adminPages/AdminRoles.jsx";
import SystemSettings from "./pages/adminPages/SystemSettings.jsx";
import PartnerAdd from "./pages/adminPages/Configuration/PartnerAdd.jsx";
import EmployeeAdd from "./pages/adminPages/Configuration/EmployeeAdd.jsx";
import LoanEntry from "./pages/adminPages/Lms/LoanEntry.jsx";
import Nach from "./pages/adminPages/Lms/Nach.jsx";
import PdcReceipt from "./pages/adminPages/Lms/PdcReceipt.jsx";
import Customer from "./pages/adminPages/Lms/Customer.jsx";
import Disbursement from "./pages/adminPages/Lms/Disbursement.jsx";
import Schedule from "./pages/adminPages/Lms/Schedule.jsx";
import LoanCloser from "./pages/adminPages/Lms/LoanCloser.jsx";
import DueList from "./pages/adminPages/Lms/DueList.jsx";
import Task from "./pages/adminPages/Lms/Task.jsx";
import Waiver from "./pages/adminPages/Lms/Waiver.jsx";
import Repossess from "./pages/adminPages/Lms/Repossess.jsx";
import Branch from "./pages/adminPages/Configuration/BranchManagement.jsx";
import LoanSwap from "./pages/adminPages/Configuration/LoanSwap.jsx";
import LoanProduct from "./pages/adminPages/Configuration/LoanProduct.jsx";
import Location from "./pages/adminPages/Configuration/Location.jsx";
import MastersSetup from "./pages/adminPages/Configuration/MastersSetup.jsx";
import KycVerification from "./pages/adminPages/Configuration/KycVerification.jsx";
import CreditAsignment from "./pages/adminPages/Configuration/CreditAsignment.jsx";
import VehicleMasters from "./pages/adminPages/Configuration/VehicleMasters.jsx";
import ConsumerDurable from "./pages/adminPages/Configuration/ConsumerDurable.jsx";
import AttendanceReport from "./pages/adminPages/reports/AttendanceReport.jsx";


function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="our-method" element={<OurMethod />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="opportunity" element={<Opportunity />} />
        <Route path="vision-and-mission" element={<VisionAndMission />} />
        <Route path="policies" element={<Policies />} />
        <Route path="board-of-directors" element={<BoardOfDirectors />} />
        <Route path="key-managerial-personnel" element={<KeyManagerialPersonnel />} />
        <Route path="our-investors" element={<OurInvestors />} />
        <Route path="financial-information" element={<FinancialInformation />} />
        <Route path="annual-report" element={<AnnualReport />} />
        <Route path="committees" element={<Committees />} />
        <Route path="corporate-governance" element={<CorporateGovernance />} />
        <Route path="shareholder-information" element={<Shareholderinformation />} />
        <Route path="csr" element={<CSR />} />
        <Route path="news-and-media" element={<NewsAndMedia />} />
        <Route path="sarfaesi-auction-notices" element={<SarfaesiAuctionNotices />} />
        <Route path="finova-hr" element={<FinovaHR />} />
        <Route path="welcome-to-finova" element={<WelcometoFinova />} />
        <Route path="employees-benefit" element={<EmployeesBenefit />} />
        <Route path="join-the-finova-faimily" element={<JointheFinovaFaimily />} />
        <Route path="apply-now" element={<ApplyNow />} />
        <Route path="policies-and-codes" element={<PoliciesAndCodes />} />
        <Route path="sarfaesi" element={<SARFAESI />} />
        <Route path="credit-rating" element={<CreditRating />} />
        <Route path="notice-of-ballot" element={<NoticeOfBallot />} />
        <Route path="under-regulation" element={<UnderRegulation />} />
        <Route path="public-disclosure-under-liquidity-risk" element={<PublicDisclosureUnderLiquidityRisk />} />
        <Route path="others-disclosures" element={<OtherDisclosures />} />
      </Route>


      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="los" element={<Los />} />
        <Route path="loan-requests" element={<LoanRequests />} />
        <Route path="borrowers" element={<Borrowers  />} />
        <Route path="accounting" element={<Accounting />} />
        <Route path="reports" element={<Reports />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="admin-roles" element={<AdminRoles />} />
        <Route path="system-settings" element={<SystemSettings />} />

        //LMS 
        <Route path="loanEntry" element={<LoanEntry />} />
        <Route path="nach" element={<Nach />} />
        <Route path="PdcReceipts" element={<PdcReceipt />} />
        <Route path="Customer" element={<Customer />} />
        <Route path="Disbursement" element={<Disbursement />} />
        <Route path="Schedule" element={<Schedule />} />
        <Route path="loan-closer" element={<LoanCloser />} />
        <Route path="due-list" element={<DueList />} />
        <Route path="task" element={<Task />} />
        <Route path="waiver" element={<Waiver />} />
        <Route path="repossess" element={<Repossess />} />


        //Configuration
        <Route path="Configuration/Partner" element={<PartnerAdd />} />
        <Route path="Configuration/Employee" element={<EmployeeAdd />} />
        <Route path="Configuration/BranchManagement" element={<Branch />} />
        <Route path="configuration/loan-swap" element={<LoanSwap />} />
        <Route path="configuration/loan-product" element={<LoanProduct />} />
        <Route path="configuration/location" element={<Location />} />
        <Route path="configuration/masters-setup" element={<MastersSetup />} />
        <Route path="configuration/kyc-verification" element={<KycVerification />} />
        <Route path="configuration/credit-asignment" element={<CreditAsignment />} />
        <Route path="configuration/vehicle-masters" element={<VehicleMasters />} />
        <Route path="configuration/consumer-durable" element={<ConsumerDurable />} />


        //reports
        <Route path="reports/attendance-report" element={<AttendanceReport />} />
        
      </Route>

    </Routes>
  );
}

export default App;

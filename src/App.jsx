// src/App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";

/* -------------------------------
   LAYOUTS
-------------------------------- */
import Layout from "./layouts/Layout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

/* -------------------------------
   PUBLIC WEBSITE PAGES
-------------------------------- */
import Home from "./pages/publicPages/Home.jsx";
import Products from "./pages/publicPages/Products.jsx";
import ContactUs from "./pages/publicPages/ContactUs.jsx";
import OurMethod from "./pages/publicPages/OurMethod.jsx";
import AboutUs from "./pages/publicPages/AboutUs.jsx";
import Opportunity from "./pages/publicPages/Opportunity.jsx";
import VisionAndMission from "./pages/publicPages/VisionAndMission.jsx";
import Policies from "./pages/publicPages/Policies.jsx";
import BoardOfDirectors from "./pages/publicPages/BoardOfDirectors.jsx";
import KeyManagerialPersonnel from "./pages/publicPages/KeyManagerialPersonnel.jsx";
import OurInvestors from "./pages/publicPages/OurInvestors.jsx";
import FinancialInformation from "./pages/publicPages/FinancialInformation.jsx";
import AnnualReport from "./pages/publicPages/AnnualReport.jsx";
import Committees from "./pages/publicPages/Committees.jsx";
import CorporateGovernance from "./pages/publicPages/CorporateGovernance.jsx";
import Shareholderinformation from "./pages/publicPages/Shareholderinformation.jsx";
import CSR from "./pages/publicPages/CSR.jsx";
import NewsAndMedia from "./pages/publicPages/NewsAndMedia.jsx";
import FinovaHR from "./pages/publicPages/FinovaHR.jsx";
import WelcometoFinova from "./pages/publicPages/WelcometoFinova.jsx";
import EmployeesBenefit from "./pages/publicPages/EmployeesBenefit.jsx";
import JointheFinovaFaimily from "./pages/publicPages/JointheFinovaFaimily.jsx";
import ApplyNow from "./pages/publicPages/ApplyNow.jsx";
import PoliciesAndCodes from "./pages/publicPages/PoliciesAndCodes.jsx";
import SARFAESI from "./pages/publicPages/SARFAESI.jsx";
import CreditRating from "./pages/publicPages/CreditRating.jsx";
import NoticeOfBallot from "./pages/publicPages/NoticeOfBallot.jsx";
import UnderRegulation from "./pages/publicPages/UnderRegulation.jsx";
import PublicDisclosureUnderLiquidityRisk from "./pages/publicPages/PublicDisclosureUnderLiquidityRisk.jsx";
import OtherDisclosures from "./pages/publicPages/OtherDisclosures.jsx";
import SarfaesiAuctionNotices from "./pages/publicPages/SarfaesiAuctionNotices.jsx";

/* -------------------------------
   ADMIN PAGES
-------------------------------- */
import AdminRoute from "./routes/AdminRoute.jsx";
import Dashboard from "./pages/mainPages/dashboard.jsx";

import Los from "./pages/adminPages/Los.jsx";
import LoanRequests from "./pages/adminPages/LoanRequests.jsx";
import Borrowers from "./pages/adminPages/Borrowers.jsx";
import Configuration from "./pages/adminPages/Configuration.jsx";
import AdminRoles from "./pages/adminPages/AdminRoles.jsx";

/* LMS */
import LoanEntry from "./pages/adminPages/Lms/LoanEntry.jsx";
import Nach from "./pages/adminPages/Lms/Nach.jsx";
import PdcReceipt from "./pages/adminPages/Lms/PdcReceipt.jsx";
import Customer from "./pages/adminPages/Lms/Customer.jsx";
import Disbursement from "./pages/adminPages/Lms/Disbursement.jsx";
import EMIManagement from "./pages/adminPages/Lms/EmiManagement.jsx";
import LoanCloser from "./pages/adminPages/Lms/LoanCloser.jsx";
import Task from "./pages/adminPages/Lms/Task.jsx";
import Waiver from "./pages/adminPages/Lms/Waiver.jsx";
import Repossess from "./pages/adminPages/Lms/Repossess.jsx";

/* CONFIGURATION */
import PartnerAdd from "./pages/adminPages/Configuration/PartnerAdd.jsx";
import EmployeeAdd from "./pages/adminPages/Configuration/EmployeeAdd.jsx";
import Branch from "./pages/adminPages/Configuration/BranchManagement.jsx";
import LoanSwap from "./pages/adminPages/Configuration/LoanSwap.jsx";
import LoanProduct from "./pages/adminPages/Configuration/LoanProduct.jsx";
import Location from "./pages/adminPages/Configuration/Location.jsx";
import MastersSetup from "./pages/adminPages/Configuration/MastersSetup.jsx";
import KycVerification from "./pages/adminPages/Configuration/KycVerification.jsx";
import CreditAsignment from "./pages/adminPages/Configuration/CreditAsignment.jsx";
import VehicleMasters from "./pages/adminPages/Configuration/VehicleMasters.jsx";
import ConsumerDurable from "./pages/adminPages/Configuration/ConsumerDurable.jsx";

/* REPORTS */
import AttendanceReport from "./pages/adminPages/reports/AttendanceReport.jsx";
import DueList from "./pages/adminPages/reports/DueList.jsx";
import DisbursCollection from "./pages/adminPages/reports/DisbursCollection.jsx";
import CustomerAndBookingList from "./pages/adminPages/reports/CustomerAndBookingList.jsx";
import SalesTargetAndAchievement from "./pages/adminPages/reports/SalesTargetAndAchievement.jsx";
import NpaReports from "./pages/adminPages/reports/NpaReports.jsx";
import CrcReport from "./pages/adminPages/reports/CrcReport.jsx";

/* SYSTEM SETTINGS */
import CompanyDetails from "./pages/adminPages/SystemSettings/CompanyDetails.jsx";
import LoanConfiguration from "./pages/adminPages/SystemSettings/LoanConfiguration.jsx";
import SecuritySettings from "./pages/adminPages/SystemSettings/SecuritySettings.jsx";
import PaymentSettings from "./pages/adminPages/SystemSettings/PaymentSettings.jsx";
import Leads from "./pages/adminPages/reports/Leads.jsx";
import Profile from "./components/Profile.jsx";


function App() {
  const dispatch = useDispatch();

  // 🔥 🔥 MAIN FIX: RESTORE LOGIN ON REFRESH
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      dispatch(getCurrentUser(uid));
    }
  }, [dispatch]);

  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
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

      {/* ================= ADMIN ROUTES ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="los" element={<Los />} />
        <Route path="loan-requests" element={<LoanRequests />} />
        <Route path="borrowers" element={<Borrowers />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="admin-roles" element={<AdminRoles />} />

        {/* LMS */}
        <Route path="loanEntry" element={<LoanEntry />} />
        <Route path="nach" element={<Nach />} />
        <Route path="PdcReceipts" element={<PdcReceipt />} />
        <Route path="Customer" element={<Customer />} />
        <Route path="Disbursement" element={<Disbursement />} />
        <Route path="emi-management" element={<EMIManagement />} />
        <Route path="loan-closer" element={<LoanCloser />} />
        <Route path="task" element={<Task />} />
        <Route path="waiver" element={<Waiver />} />
        <Route path="repossess" element={<Repossess />} />

        {/* CONFIGURATION */}
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

        {/* REPORTS */}
        <Route path="reports/attendance-report" element={<AttendanceReport />} />
        <Route path="due-list" element={<DueList />} />
        <Route path="reports/disburs-collection" element={<DisbursCollection />} />
        <Route path="reports/customer-and-booking-list" element={<CustomerAndBookingList />} />
        <Route path="reports/sales-target-and-achievement" element={<SalesTargetAndAchievement />} />
        <Route path="reports/npa-reports" element={<NpaReports />} />
        <Route path="reports/crc-report" element={<CrcReport />} />
        <Route path="reports/leads" element={<Leads />} />

        {/* SYSTEM SETTINGS */}
        <Route path="system-setting/company-details" element={<CompanyDetails />} />
        <Route path="system-setting/loan-configuration" element={<LoanConfiguration />} />
        <Route path="system-setting/security-settings" element={<SecuritySettings />} />
        <Route path="system-setting/payment-settings" element={<PaymentSettings />} />

        //Profile
        <Route path="profile" element={<Profile />} />
      </Route>

    </Routes>
  );
}

export default App;
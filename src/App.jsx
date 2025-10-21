import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EnquiryForm from "./components/EnquiryForm";
import TopDestinations from "./components/TopDestinations";
import CaptivatingDestinations from "./components/CaptivatingDestinations";
import Partners from "./components/Partners";
import WhyChoose from "./components/WhyChoose";
import PackageSection from "./components/PackageSection";
import { bhutanPackages as bhutanBase } from "./data/packages";
import { mergePackages } from "./data/packageStore";
import MergedFooter from "./components/TourGuideFooter";
import DestinationPage from "./components/DestinationPage";
import Destinations from "./components/Destinations";
import { Routes, Route } from "react-router-dom";
import PackagePage from "./components/PackagePage";
import B2BPage from "./components/B2BPage";
import AboutPage from "./components/AboutPage";
import "./style.css";
import Gallery from "./components/Gallery";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FaqPage from "./components/FaqPage";
import PopularPackagesPage from "./components/PopularPackagesPage";
import AdminPanel from "./components/AdminPanel";
import CorporateTours from "./components/CorporateTours";
import WhatsAppChat from "./components/WhatsAppChat";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar fixed={true} />
              <Hero />
              <TopDestinations />
              <WhyChoose />
              <PackageSection title="Popular Bhutan Tour Packages" packages={mergePackages(bhutanBase)} />
              <CaptivatingDestinations />
              <Partners />
              <MergedFooter />
            </>
          }
        />
  {/* Destinations overview page */}
  <Route path="/destination" element={<Destinations />} />
  <Route path="/destination/:slug" element={<DestinationPage />} />
  <Route path="/package/:slug" element={<PackagePage />} />
  <Route path="/b2b-enquiry" element={<B2BPage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/faq" element={<FaqPage />} />
  <Route path="/tour-packages" element={<PopularPackagesPage />} />
  <Route path="/corporate-tours" element={<CorporateTours />} />
  <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <WhatsAppChat />
    </div>
  );
};

export default App;

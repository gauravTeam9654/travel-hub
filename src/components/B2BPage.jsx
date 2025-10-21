import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../B2BPage.css";

const B2BPage = () => {
  return (
    <>
  <Navbar fixed />
      <div className="b2b-hero-pro">
        <img className="b2b-hero-bgimg" src="/bg.png" alt="B2B Background" />
        <div className="b2b-form-card">
          <div className="b2b-form-title">B2B Enquiry</div>
          <div className="b2b-form-subtitle">DMCs of <b>Sikkim | Darjeeling | Bhutan & Northeast</b></div>
          <form className="b2b-enquiry-form-pro">
            <div className="b2b-form-row">
              <input type="text" placeholder="Company Name*" required />
              <input type="text" placeholder="Contact Person*" required />
            </div>
            <div className="b2b-form-row">
              <input type="text" placeholder="Contact Number*" required />
              <input type="email" placeholder="Company Email ID*" required />
            </div>
            <div className="b2b-form-row">
              <input type="text" placeholder="Designation" />
              <input type="text" placeholder="Company Website (eg: https://yourwebsite.com)" />
            </div>
            <textarea placeholder="Write your Query*" required />
            <button type="submit">Send Enquiry</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default B2BPage;

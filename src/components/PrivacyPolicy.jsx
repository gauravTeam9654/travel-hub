import React from "react";
import Navbar from "./Navbar";
import MergedFooter from "./TourGuideFooter";
import "../Privacy.css";

const Section = ({ title, children }) => (
  <section className="privacy-section">
    <h2>{title}</h2>
    <div className="privacy-content">{children}</div>
  </section>
);

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <Navbar fixed />

      <header className="privacy-hero" role="banner" aria-label="Privacy Policy header">
        <div className="privacy-hero-overlay" />
        <div className="privacy-hero-inner">
          <h1>Privacy Policy</h1>
          <p className="privacy-tagline">Your trust matters to us. Here’s how TravelHub handles your data.</p>
        </div>
      </header>

      <main className="privacy-main" role="main">
        <Section title="Who We Are">
          <p>
            TravelHub Tourism ("TravelHub", "we", "our", or "us") provides travel planning and tour services across
            the North East, Sikkim, Darjeeling, and Bhutan. This Privacy Policy explains what data we collect, how we use
            it, and the choices you have when you use our website and services.
          </p>
        </Section>

        <Section title="Information We Collect">
          <ul>
            <li>
              <b>Contact details:</b> name, email address, phone number, city, and any information you share while submitting
              enquiry forms.
            </li>
            <li>
              <b>Trip details:</b> number of travelers, travel dates, destination preferences, and special requests.
            </li>
            <li>
              <b>Usage data:</b> pages visited, interactions, and device information collected via cookies and similar
              technologies to improve our site performance and experience.
            </li>
          </ul>
        </Section>

        <Section title="Cookies & Analytics">
          <p>
            We use cookies and tracking tools including Google Analytics, Meta (Facebook) Pixel, and Microsoft Clarity to
            understand how visitors use our website, so we can improve content and usability. Cookies may store session
            information and your preferences. You can control cookies via your browser settings; disabling them may impact
            some features.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <ul>
            <li>Respond to enquiries and provide quotations tailored to your trip requirements.</li>
            <li>Confirm bookings and coordinate with hotels, transport providers, and local vendors.</li>
            <li>Assist with mandatory permits or government formalities where applicable (e.g., Sikkim/Arunachal/Bhutan).</li>
            <li>Improve our website, services, and customer support based on aggregate analytics.</li>
            <li>Comply with legal obligations and reasonable law‑enforcement requests.</li>
          </ul>
        </Section>

        <Section title="Sharing of Information">
          <p>
            We may share only the necessary details with trusted partners involved in delivering your trip—such as hotels,
            transport agencies, guides, and permit authorities. For example, traveler names, ID information, and itinerary
            details may be required to arrange permits in Sikkim, Arunachal Pradesh, or Bhutan. When needed, data may be
            transferred internationally in accordance with applicable laws and reasonable safeguards.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We take the security of your personal data seriously. Information we handle is protected through reasonable
            technical and organizational measures including SSL encryption on our website and restricted access to systems.
            While no method is 100% secure, we continually review our practices to keep your information safe.
          </p>
        </Section>

        <Section title="Your Choices">
          <ul>
            <li>We currently do not require account sign‑ups or logins for this website.</li>
            <li>We do not send promotional emails by default. If this changes, you’ll have a clear opt‑out option.</li>
            <li>You can request access, correction, or deletion of your personal data we hold, subject to legal obligations.</li>
          </ul>
        </Section>

        <Section title="Retention">
          <p>
            We retain personal information only for as long as necessary to provide services, meet legal requirements, and
            resolve disputes. When data is no longer needed, we take steps to delete or anonymize it.
          </p>
        </Section>

        <Section title="Updates to this Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our services or regulations. We will
            post the updated version on this page with a revised effective date.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            For privacy‑related requests or questions, contact us at <a href="mailto:info@travelhub.com">info@travelhub.com</a>
            or call <a href="tel:+919558515518">+91 95585 15518</a> / <a href="tel:+919083701454">+91 90837 01454</a>.
          </p>
        </Section>

        <p className="privacy-note">
          By using our website, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of
          our website and services.
        </p>
      </main>

      <MergedFooter />
    </div>
  );
};

export default PrivacyPolicy;

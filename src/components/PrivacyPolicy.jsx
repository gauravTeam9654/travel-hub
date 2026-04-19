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
        <Section title="Our Commitment to Your Privacy">
          <p>
            Travel Hub deeply respects your privacy and fully recognizes the importance of protecting the personally
            identifiable information you choose to share with us. Personally identifiable information refers to any
            information through which you can be individually identified, such as your name, residential or mailing
            address, and telephone number. We would like to assure every visitor and customer that we follow appropriate
            and responsible standards when it comes to safeguarding your privacy on our websites, and we remain committed
            to handling your personal details with the same level of care and confidentiality that we would expect for
            ourselves.
          </p>
        </Section>

        <Section title="Use of Cookies">
          <p>
            Some of our web pages make use of “cookies” so that we can better serve you with customized and relevant
            information each time you return to our site. Cookies are small identifiers that a website can send to your
            browser and store on your computer, helping to facilitate a smoother and more personalized experience during
            your next visit to our site. You have full control over how cookies are handled on your device—you can set
            your browser to notify you whenever a cookie is being sent, giving you the option to decide whether or not to
            accept it. The information we collect and analyze through these cookies is used solely to understand visitor
            behavior and continuously improve the service we offer to you.
          </p>
        </Section>

        <Section title="Collection of Personal Information">
          <p>
            There are times during your interaction with our website when we may need to collect certain personal
            information from you, such as your name, physical address, or telephone number. It is our clear intent to
            inform you in advance before any such information is collected and to explain exactly what we intend to do
            with the information once it is provided. Generally, you will always have the option not to provide the
            information requested, and in the future you will also be able to “opt out” of certain uses of the
            information you have already shared with us. If you choose not to provide the information we request, you
            are still most welcome to visit our website at <a href="https://www.travelhubind.com">https://www.travelhubind.com</a>;
            however, you may be unable to access certain options, offers, and services that specifically require those
            details.
          </p>
        </Section>

        <Section title="Disclosure to Third Parties">
          <p>
            Travel Hub will not sell, trade, rent, or otherwise disclose to any third parties any information derived
            from the registration for, or use of, any online service—including but not limited to names and addresses—
            without first obtaining the consent of the user or customer. The only exceptions to this commitment are
            circumstances where disclosure is required by subpoena, search warrant, or other legal process, or in the
            case of imminent physical harm to the user or others. Travel Hub will, however, allow trusted suppliers to
            access the necessary information strictly for the purposes of confirming your registration and ensuring that
            you receive the benefits and services you are entitled to as part of your travel arrangements.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            Travel Hub will take all appropriate and reasonable steps to protect the information you choose to share
            with us. We have implemented technology and security features along with strict internal policy guidelines
            designed to safeguard the privacy of your personally identifiable information from unauthorized access,
            improper use, or accidental disclosure. As part of our ongoing commitment to your security, Travel Hub will
            continue to enhance and upgrade our security procedures as new and more advanced technology becomes available,
            ensuring that your information is handled with the highest level of protection possible.
          </p>
        </Section>

        <Section title="Updates to this Policy & Contact">
          <p>
            If our privacy policy changes at any point in the future, the updated version will be posted here on this
            page along with a new effective date so that you are always aware of the current terms. You are encouraged to
            access and review our privacy policy regularly to ensure you fully understand our most up‑to‑date practices
            and policies. Should you wish to share any concerns, questions, or inquiries relating to your privacy, please
            reference the privacy policy in the subject line of your communication. Travel Hub will make every reasonable
            effort to respond to all genuine concerns or inquiries within five business days of receipt.
          </p>
        </Section>
      </main>

      <MergedFooter />
    </div>
  );
};

export default PrivacyPolicy;

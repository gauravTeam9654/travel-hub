import React from "react";
import Navbar from "./Navbar";
import MergedFooter from "./TourGuideFooter";
import "../Terms.css";

const Section = ({ title, children }) => (
  <section className="terms-section">
    <h2>{title}</h2>
    <div className="terms-content">{children}</div>
  </section>
);

const TermsAndConditions = () => {
  return (
    <div className="terms-page">
      <Navbar fixed />

      <header className="terms-hero" role="banner" aria-label="Terms & Conditions header">
        <div className="terms-hero-overlay" />
        <div className="terms-hero-inner">
          <h1>Terms & Conditions</h1>
        </div>
      </header>

      <main className="terms-main" role="main">
        <Section title="1. Introduction">
          <ul>
            <li>
              These Terms and Conditions govern all the services offered and provided by Travel Hub, and they form the
              complete understanding between the traveler and the company with regard to the use of our travel and tour
              services.
            </li>
            <li>
              By booking any package, service, or arrangement with Travel Hub, you acknowledge, accept, and fully agree
              to abide by these Terms and Conditions in their entirety.
            </li>
          </ul>
        </Section>

        <Section title="2. Booking and Payment">
          <ul>
            <li>
              All bookings must be made exclusively through Travel Hub’s official channels, which include our website,
              our office, or our authorized representatives, to ensure that your booking is genuine and properly recorded
              in our system.
            </li>
            <li>
              A deposit is required at the time of booking in order to confirm your reservation, while the remaining
              balance must be paid in full before the scheduled travel date as per the agreed payment schedule.
            </li>
            <li>
              Please note that prices quoted are subject to change until the full payment has been received and the
              booking is fully confirmed, as rates offered by suppliers may fluctuate with time and availability.
            </li>
            <li>
              All payments must be made in Indian Rupees (INR), unless otherwise specified in writing at the time of
              booking for certain international arrangements.
            </li>
          </ul>
        </Section>

        <Section title="3. Usual Cancellation Policy">
          <ul>
            <li>
              If a booking is cancelled anywhere from 0 days up to 7 days before the scheduled check-in date, 100% of
              the total booking amount will be charged as cancellation fees.
            </li>
            <li>
              If a booking is cancelled between 7 days and 20 days prior to the check-in date, 50% of the total booking
              amount will be charged as cancellation fees.
            </li>
            <li>
              If a booking is cancelled 30 days or more before the check-in date, a minimal charge of 10% of the total
              booking amount will be applicable as cancellation fees.
            </li>
            <li>
              No refund whatsoever will be provided for any cancellation received on bookings made for the peak period
              between 15th December and 15th January.
            </li>
            <li>
              No refunds will be issued for unused nights, early check-outs, or any portion of the service that is
              voluntarily left unutilized by the traveler.
            </li>
          </ul>
        </Section>

        <Section title="4. Travel Documents">
          <ul>
            <li>
              Travelers are solely responsible for ensuring that they carry valid passports, appropriate visas, permits,
              and all other required travel documents in accordance with the requirements of the destination and their
              nationality.
            </li>
            <li>
              Travel Hub shall not be held liable in any manner for denied boarding, denied entry, or deportation
              resulting from incomplete, expired, or improperly prepared travel documentation.
            </li>
          </ul>
        </Section>

        <Section title="5. Changes and Modifications">
          <ul>
            <li>
              Any changes requested to existing bookings—including but not limited to travel dates, destinations, or
              traveler names—may incur additional charges as per the applicable supplier and company policies at the
              time of the modification.
            </li>
            <li>
              Travel Hub reserves the right to modify itineraries when necessary, due to unforeseen circumstances such
              as adverse weather conditions, strikes, safety concerns, or any other situation that may affect the smooth
              and safe operation of the tour.
            </li>
          </ul>
        </Section>

        <Section title="6. Liability">
          <ul>
            <li>
              Travel Hub acts strictly as an intermediary between clients and various service providers, such as
              airlines, hotels, transport companies, and local vendors, and coordinates the arrangement of these
              services on behalf of the traveler.
            </li>
            <li>
              We shall not be held liable for delays, cancellations, accidents, injuries, or losses that are caused by
              any third-party service provider or by circumstances that fall outside of our direct control.
            </li>
            <li>
              Clients are strongly advised and encouraged to purchase a comprehensive travel insurance policy to protect
              themselves against any unforeseen events, medical emergencies, or losses that may occur before or during
              their journey.
            </li>
          </ul>
        </Section>

        <Section title="7. Health and Safety">
          <ul>
            <li>
              Travelers must strictly comply with all health regulations, vaccination requirements, and safety
              guidelines of the destination country or region that they are visiting.
            </li>
            <li>
              Travel Hub will not be held responsible for any medical expenses, hospitalization costs, or health-related
              charges incurred by the traveler during the course of travel.
            </li>
            <li>
              Any restrictions related to COVID-19 or other pandemic situations are governed by the prevailing
              government guidelines, and travelers are expected to remain updated with and adhere to all such
              directives.
            </li>
          </ul>
        </Section>

        <Section title="8. Force Majeure">
          <ul>
            <li>
              Travel Hub shall not be held liable for any failure or delay in the provision of services caused by events
              that are beyond our reasonable control, including but not limited to natural disasters, political unrest,
              civil disturbances, pandemics, strikes, or any new government regulations that impact travel and
              hospitality services.
            </li>
          </ul>
        </Section>

        <Section title="9. Privacy Policy">
          <ul>
            <li>
              Any personal information provided by the client during the booking process will be used solely for the
              purpose of making and coordinating your travel arrangements and will not be shared for unrelated
              commercial purposes.
            </li>
            <li>
              Travel Hub fully respects client confidentiality and complies with all applicable data protection laws
              currently in force in India, ensuring that your personal details are handled responsibly and with due
              care.
            </li>
          </ul>
        </Section>

        <Section title="10. Governing Law">
          <ul>
            <li>
              These Terms and Conditions are governed by, and shall be interpreted in accordance with, the laws of
              India, as applicable to contracts executed and performed within the country.
            </li>
            <li>
              Any disputes, claims, or proceedings arising out of or in connection with these Terms and Conditions shall
              be subject to the exclusive jurisdiction of the competent courts located in New Delhi.
            </li>
          </ul>
        </Section>
      </main>

      <MergedFooter />
    </div>
  );
};

export default TermsAndConditions;

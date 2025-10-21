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
        <Section title="Mandatory Documents">
          <ul>
            <li>
              <b>Sikkim:</b> Valid ID proof – Voter ID / Passport / Driving License. PAN Card & Aadhar Card are not accepted. For children below 18 years: Aadhar or Birth Certificate. 4 passport-sized photographs of each person required.
            </li>
            <li>
              <b>North East:</b> Aadhar Card, Driving License, Passport, or Voter ID required (PAN Card not accepted). Aadhar Card (front & back) and passport-size photo copy required for booking.
            </li>
            <li>
              <b>Bhutan:</b>
              <ul>
                <li>Adults (18+): Original Voter Card or Passport (minimum 6 months validity).</li>
                <li>Children (below 18): Original Birth Certificate in English.</li>
                <li>Aadhar Card, PAN Card & Driving License not accepted.</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="Payment Policy">
          <ul>
            <li>
              <b>Sikkim:</b>
              <ul>
                <li>40% advance payment to confirm the package.</li>
                <li>Remaining balance on arrival (cash/demand draft; 3% charge for credit card).</li>
                <li>Arrival details (train/flight) required for scheduling.</li>
              </ul>
            </li>
            <li>
              <b>Bhutan:</b>
              <ul>
                <li>40% advance payment to confirm booking.</li>
                <li>Remaining balance to be paid at the office or airport before the trip starts.</li>
              </ul>
            </li>
            <li>
              <b>North East:</b>
              <ul>
                <li>Credit Cards / Traveler’s Cheques not freely accepted.</li>
                <li>Advance paid is non-refundable in case of cancellation due to COVID or similar situations. It can be adjusted for future bookings.</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="About Transport">
          <ul>
            <li>
              <b>Sikkim:</b> Due to limited parking, guests must wait in the hotel lobby. Vehicles provided sector-wise, not on disposal basis (only point-to-point). Nathula trip will be on a shared cab basis.
            </li>
            <li>
              <b>North East:</b> AC will not run in hilly areas. Tawang: No local sightseeing vehicle provided by us. Guests must hire local vehicles (cost between ₹4500–₹5500 approx, excluding Bumla). No Jio network in Tawang.
            </li>
            <li>
              <b>Bhutan:</b> AC is not allowed on hilly roads (to be discussed with the driver). Vehicle timing: 9:00 AM to 6:00 PM, point-to-point service only, not at disposal.
            </li>
          </ul>
        </Section>

        <Section title="Hotel Accommodation">
          <ul>
            <li>
              <b>Sikkim:</b> Hotel check-in/out depends on hotel policy. No responsibility for losses/costs incurred.
            </li>
            <li>
              <b>North East:</b> No rooms booked until confirmation. All hotels in Meghalaya/Arunachal Pradesh are non-AC and do not have lifts.
            </li>
            <li>
              <b>Bhutan:</b> If hotels mentioned are unavailable, similar type of hotels will be provided.
            </li>
          </ul>
        </Section>

        <Section title="Itinerary and Package Policy">
          <ul>
            <li>The itinerary is a suggested plan; the company is responsible only for paid services.</li>
            <li>No responsibility for additional services not charged for.</li>
            <li>Itineraries may change due to natural or political disruptions.</li>
            <li>Additional costs due to such changes are to be borne by the guest.</li>
          </ul>
        </Section>

        <Section title="Weather and Health Advisory">
          <ul>
            <li>
              <b>North East:</b> Woolen clothes and jackets are advised. Travel with limited luggage.
            </li>
            <li>Guests traveling to Assam, Meghalaya, or Arunachal Pradesh must be fully vaccinated or present a valid RTPCR (not older than 72 hours).</li>
          </ul>
        </Section>

        <Section title="Amendment">
          <ul>
            <li>Changes to booked tours are considered cancellations, but minor amendments can be made with a communication fee.</li>
          </ul>
        </Section>

        <Section title="Refund">
          <ul>
            <li>Refunds will be processed by the booking source via account payee cheque within 15 days.</li>
            <li><b>NO REFUND WILL BE MADE AGAINST ANY UNUSED SERVICES, WHATEVER MAY BE THE REASON.</b></li>
          </ul>
        </Section>

        <Section title="Prepone & Postpone">
          <ul>
            <li>Any postponement/cancellation must be communicated in writing at least 7 days before the scheduled departure.</li>
            <li>A fee of ₹3,000 will apply for postponement.</li>
          </ul>
        </Section>

        <Section title="Cancellation Policy">
          <ul>
            <li>(Common Across Regions, with Bhutan-specific details below)</li>
            <li>Cancellation must be sent via Mail/Fax.</li>
            <li>30+ Days: Communication Charges ₹2000 per person</li>
            <li>21–30 Days: 25% of tour cost</li>
            <li>11–20 Days: 50% of tour cost</li>
            <li>10 or fewer Days: Full cancellation</li>
            <li>Efforts will be made to minimize cancellation charges.</li>
            <li>
              <b>Bhutan-specific:</b>
              <ul>
                <li>20–10 Days Before Departure: 20% cancellation fee</li>
                <li>10–05 Days Before Departure: 50% cancellation fee</li>
              </ul>
            </li>
          </ul>
        </Section>

        <Section title="Disclaimers">
          <ul>
            <li>Unused accommodations, meals, transport, or tours are non-refundable.</li>
            <li>Room allocation is based on availability.</li>
            <li>No refund for dissatisfaction with services.</li>
            <li>Company is not responsible for changes due to permit failure, government rules, or natural calamities.</li>
          </ul>
        </Section>
      </main>

      <MergedFooter />
    </div>
  );
};

export default TermsAndConditions;

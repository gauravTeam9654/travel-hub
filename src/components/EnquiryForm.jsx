import React from 'react';

const EnquiryForm = () => {
  return (
    <div className="enquiry-form-container">
      <div className="enquiry-form-title">Send Your Query</div>
      <form className="enquiry-form" aria-label="Homepage enquiry form">
        <input className="enquiry-input" type="text" name="name" placeholder="Your Name" aria-label="Your Name" autoComplete="name" />
        <div className="enquiry-row">
          <input
            className="enquiry-input"
            type="text"
            name="arrivalDate"
            placeholder="Arrival Date"
            aria-label="Arrival Date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text';
            }}
          />
          <input
            className="enquiry-input"
            type="text"
            name="departureDate"
            placeholder="Departure Date"
            aria-label="Departure Date"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text';
            }}
          />
        </div>
        <input className="enquiry-input" type="tel" name="phone" placeholder="Your Mobile Number" aria-label="Your Mobile Number" autoComplete="tel" inputMode="tel" />
        <input className="enquiry-input" type="email" name="email" placeholder="Email Id" aria-label="Email Id" autoComplete="email" />
        <div className="enquiry-row">
          <input className="enquiry-input" type="number" name="adults" placeholder="No of Adults" aria-label="Number of Adults" min="1" />
          <input className="enquiry-input" type="number" name="children" placeholder="No of Childs" aria-label="Number of Children" min="0" />
        </div>
        <input className="enquiry-input" type="text" name="address" placeholder="Address" aria-label="Address" autoComplete="street-address" />
        <button className="enquiry-btn" type="submit">Send Enquiry</button>
      </form>
    </div>
  );
};

export default EnquiryForm;

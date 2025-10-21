import React, { useState } from "react";
import "../style.css";

/**
 * FAQAccordion - Modern FAQ accordion for package pages
 * @param {Array<{q: string, a: string}>} faqs
 */
const FAQAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="faq-accordion-box">
      <h3 className="faq-title">Frequently Asked Questions</h3>
      <div className="faq-accordion-list">
        {faqs.map((item, i) => (
          <div className={`faq-accordion-item${openIndex === i ? " open" : ""}`} key={i}>
            <button
              className="faq-accordion-question"
              onClick={() => toggle(i)}
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
            >
              <span>{item.q}</span>
              <span className="faq-accordion-icon">{openIndex === i ? "−" : "+"}</span>
            </button>
            <div
              className="faq-accordion-answer"
              id={`faq-panel-${i}`}
              style={{ display: openIndex === i ? "block" : "none" }}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;

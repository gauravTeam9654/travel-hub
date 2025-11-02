import React from "react";
import { destinations as allDestinations } from "../data/destinations";
import "../style.css";

const tourGuideData = [
  {
    title: "Sikkim",
    items: [
      "About Sikkim",
      "Places to Visit in Sikkim",
      "Lakes in Sikkim",
      "Best Time To Visit Sikkim",
      "Rumtek Monastery",
      "Enchey Monastery",
      "Top 19 Things to Do in Sikkim",
      "Paragliding in Gangtok",
    ],
  },
  {
    title: "Arunachal Pradesh",
    items: [
      "About Arunachal Pradesh",
      "Monasteries in Arunachal Pradesh",
      "Culture of North East",
      "Waterfalls in North East",
      "National Park & Sanctury in North East",
      "Tawang in Monsoon",
      "Trekking in North East",
      "Off beats of Arunachal Pradesh",
    ],
  },
  {
    title: "Darjeeling",
    items: [
      "About Darjeeling",
      "Best time to go to Darjeeling",
      "Places to visit in Darjeeling",
      "Off Beats of North Bengal",
      "Ghoom Monastery",
      "Makaibari Tea Estate",
      "Mirik Lake",
      "Lamahatta",
      "Tinchuley",
      "Takdah",
    ],
  },
  {
    title: "Bhutan",
    items: [
      "About Bhutan",
      "Things to do in Bhutan",
      "Best time to visit Bhutan",
      "Bhutan in Full Bloom",
      "Monastery in Bhutan",
      "Bhutanese Hot Stone Bath",
      "Lakes in Bhutan",
      "Tiger Nest Trekking",
      "Cultural Point Bhutan",
      "Snow Man trekking",
    ],
  },
  {
    title: "Meghalaya",
    items: [
      "Kaziranga Jeep Safari",
      "About Meghalaya",
      "Places to visit in Meghalaya",
      "Things to do in Meghalaya",
      "Best Time to visit Meghalaya",
      "Top Unexplored Villages of Meghalaya",
      "Caves & Waterfalls in Meghalaya",
      "Trekking in Meghalaya",
      "Lakes in Meghalaya",
    ],
  },
];

const MergedFooter = () => {
  return (
    <footer
      style={{
  background: "#f2f0f0",
  borderRadius: "120px 120px 0 0",
        padding: "40px 24px 24px 24px",
        margin: "40px auto 0 auto",
        maxWidth: 1200,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)",
      }}
    >
      <h2 style={{ textAlign: "center", fontWeight: 600, marginBottom: 16 }}>
        Tour Guide
      </h2>
      <p style={{
        textAlign: "center",
        color: "#444",
        maxWidth: 1200,
        margin: "0 auto 32px auto",
        fontSize: "15px",
        lineHeight: 1.5,
        fontWeight: 400
      }}>
     Experience the charm of Himachal with TravelHub. Discover the best routes, cozy stays, and top attractions — all designed to make your mountain getaway seamless and memorable. </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        {/* {tourGuideData.map((section) => (
          <div key={section.title} style={{ minWidth: 180, flex: 1, marginBottom: 24 }}>
            <h4 style={{ fontWeight: 600, marginBottom: 12 }}>{section.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.items.map((item) => {
                const lower = item.toLowerCase();
                // Decide destination slug based on section and item text
                let slug =
                  section.title === "Darjeeling" ? "darjeeling" :
                  section.title === "Bhutan" ? "bhutan" :
                  section.title === "Meghalaya" ? "meghalaya" :
                  section.title === "Arunachal Pradesh" ? "arunachal-pradesh" :
                  // For Sikkim, choose gangtok-specific when mentioned, else north-sikkim
                  section.title === "Sikkim" && lower.includes("gangtok") ? "gangtok" :
                  section.title === "Sikkim" ? "north-sikkim" : "";

                // Validate slug exists in data; if not, fallback to first destination
                const hasSlug = allDestinations.some((d) => d.slug === slug);
                if (!hasSlug) {
                  slug = allDestinations[0]?.slug || "darjeeling";
                }

                // Map item text to tab
                let tab = "packages";
                if (lower.includes("about")) tab = "about";
                else if (lower.includes("best time")) tab = "guide";
                else if (lower.includes("lake")) tab = "lakes";
                else if (lower.includes("monaster")) tab = "monasteries";
                else if (lower.includes("off beat") || lower.includes("offbeat")) tab = "offbeat";
                else if (lower.includes("things to do") || lower.includes("trek") || lower.includes("culture") || lower.includes("waterfalls") || lower.includes("national park") || lower.includes("sanctury") || lower.includes("sanctuary") || lower.includes("places")) tab = "places";

                const href = `/destination/${slug}?tab=${tab}`;

                return (
                  <li key={item} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ color: "#ff6600", fontSize: 18, marginRight: 8 }}>●</span>
                    <a href={href} style={{ color: "#222", fontSize: 15, textDecoration: "none" }}>{item}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))} */}
      </div>
      <hr style={{
        border: "none",
        borderTop: "2px solid #dedede",
        margin: "40px 0 32px 0",
        width: "100%"
      }} />
      {/* Footer Section Below Tour Guide */}
      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32 }}>
  <div style={{ minWidth: 220, flex: 1, marginBottom: 24 }}>
          <img src="/partners/logo.png" alt="TravelHub" style={{ width: 140, marginBottom: 16 }} />
          <div style={{ marginBottom: 16 }}>
            <img src="/bni.svg" alt="BNI" style={{ width: 50, marginRight: 8 }} />
            <img src="/iso.svg" alt="ISO" style={{ width: 50 }} />
          </div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Follow Us</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {/* Instagram */}
            <a
              href="https://instagram.com/tripjyada"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4.5" stroke="#E1306C" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.3" fill="#E1306C"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com/tripjyada"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.06C22 6.55 17.52 2.08 12 2.08 6.48 2.08 2 6.55 2 12.06c0 4.97 3.66 9.09 8.44 9.88v-6.99H8.1v-2.89h2.34V9.41c0-2.3 1.37-3.57 3.46-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.7-1.47 1.42v1.71h2.5l-.4 2.89h-2.1v6.99C18.34 21.15 22 17.03 22 12.06z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com/@tripjyada"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="22" height="16" viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5 3.5a4 4 0 0 0-2.8-2.8C18.8 0 12 0 12 0S5.2 0 3.3.7A4 4 0 0 0 .5 3.5 41.2 41.2 0 0 0 0 8.5a41.2 41.2 0 0 0 .5 5 4 4 0 0 0 2.8 2.8C5.2 17 12 17 12 17s6.8 0 8.7-.7a4 4 0 0 0 2.8-2.8c.4-1.7.5-3.3.5-5s-.1-3.3-.5-5Z" fill="#FF0000"/>
                <path d="M10 12.1V4.9l6 3.6-6 3.6Z" fill="#fff"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919558515518"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#25D366" d="M20.5 3.5A11 11 0 0 0 3.6 20.4l-1.1 4 4.1-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17c-1.7 0-3.3-.5-4.7-1.4l-.3-.2-2.8.8.8-2.7-.2-.3A8.6 8.6 0 1 1 12 20.5Z"/>
                <path fill="#25D366" d="M16.9 13.7c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.9 1-.2.2-.3.2-.6.1a7 7 0 0 1-3.3-2.9c-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.2 3.9.6.3 1 .5 1.3.6.5.2 1 .2 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.1-.3-.2Z"/>
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:info@travelhub.com"
              aria-label="Email"
              title="Email"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" fill="#3b5fc1"/>
              </svg>
            </a>
            {/* Phone */}
            <a
              href="tel:+919558515518"
              aria-label="Call"
              title="Call"
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2 .6 3.1.6.7 0 1.3.6 1.3 1.3v3.5c0 .7-.6 1.3-1.3 1.3C9.6 22 2 14.4 2 4.3 2 3.6 2.6 3 3.3 3H6.8c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.1.6 3.1.2.4.1.9-.2 1.2l-1.9 2.2Z" fill="#25A55F"/>
              </svg>
            </a>
          </div>
          <div style={{ marginBottom: 8 }}>
            {/* <a href="#" style={{ color: "#3b5fc1", fontWeight: 500 }}>North East Cab</a> | <a href="#" style={{ color: "#3b5fc1", fontWeight: 500 }}>Sikkim Darjeeling Tourism</a> */}
          </div>
          <div style={{ marginBottom: 8 }}>
            {/* <a href="/#/terms-and-conditions" style={{ color: "#3b5fc1", fontWeight: 500 }}>Terms & Conditions</a> | <a href="/#/privacy-policy" style={{ color: "#3b5fc1", fontWeight: 500 }}>Privacy Policy</a> */}
          </div>
          <div style={{ color: "#888", fontSize: 13 }}>
            © TravelHub Tourism. All rights reserved.
          </div>
        </div>
        <div style={{ minWidth: 180, flex: 1, marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>Quick Links</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 18 }}><a href="/#/about" style={{ color: '#222', textDecoration: 'none' }}>About Us</a></li>
            <li style={{ marginBottom: 18 }}><a href="/#/gallery" style={{ color: '#222', textDecoration: 'none' }}>Our Gallery</a></li>
            {/* <li style={{ marginBottom: 0, cursor: 'pointer' }} onClick={() => window.location.href='/#/b2b-enquiry'}>B2B Enquiry</li> */}
          </ul>
        </div>
        <div style={{ minWidth: 180, flex: 1, marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>Corporate Tours</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: 18 }}>
              <a href="/#/corporate-tours" style={{ color: '#222', textDecoration: 'none' }}>Corporate Tours</a>
            </li>
            <li style={{ marginBottom: 18 }}>
              <a href="/#/terms-and-conditions" style={{ color: '#222', textDecoration: 'none' }}>Terms and Conditions</a>
            </li>
            <li style={{ marginBottom: 18 }}><a href="/#/privacy-policy" style={{ color: '#222', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li style={{ marginBottom: 18 }}><a href="/#/faq" style={{ color: '#222', textDecoration: 'none' }}>FAQ</a></li>
            <li style={{ fontWeight: 600, marginBottom: 18 }}>
              <a href="/#/tour-packages" style={{ color: '#222', textDecoration: 'none' }}>Popular Packages</a>
            </li>
            <li style={{ marginBottom: 0 }}>Best Travel Agency in India</li>
          </ul>
        </div>
        <div style={{ minWidth: 220, flex: 1, marginBottom: 24 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>GSTIN : <span style={{ fontWeight: 700 }}>19AATFT6367Q1ZS</span></div>
            <div style={{ marginBottom: 8 }}>9558515518 / 9083701454 / <span role="img" aria-label="phone">📞</span></div>
            <div style={{ marginBottom: 8 }}>info@travelhub.com <span role="img" aria-label="email">✉️</span></div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Head Office : <span style={{ fontWeight: 400 }}>Shivmandir, Siliguri, Darjeeling – 734011</span></div>
            <div style={{ fontWeight: 600 }}>Corporate Office : <span style={{ fontWeight: 400 }}>197, Jodhpur Gardens, Kolkata – 700045 <span role="img" aria-label="location">📍</span></span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MergedFooter;

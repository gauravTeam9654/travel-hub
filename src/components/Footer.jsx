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
        Plan a hassle-free tour to Sikkim and Darjeeling with TravelHub. Find all the essential details on the best ways to reach these destinations, transportation options, and the ideal time to visit. Explore Sikkim’s serene landscapes and Darjeeling’s iconic tea gardens with ease using our user-friendly map.
      </p>
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
                  section.title === "Sikkim" && lower.includes("gangtok") ? "gangtok" :
                  section.title === "Sikkim" ? "north-sikkim" : "";

                // Validate slug from data
                const hasSlug = allDestinations.some((d) => d.slug === slug);
                if (!hasSlug) slug = allDestinations[0]?.slug || "darjeeling";

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

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32 }}>
  <div style={{ minWidth: 220, flex: 1, marginBottom: 24 }}>
          <img src="/partners/logo.png" alt="TravelHub" style={{ width: 140, marginBottom: 16 }} />
          <div style={{ marginBottom: 16 }}>
            <img src="/bni.svg" alt="BNI" style={{ width: 50, marginRight: 8 }} />
            <img src="/iso.svg" alt="ISO" style={{ width: 50 }} />
          </div>
          {/* <div style={{ fontWeight: 600, marginBottom: 8 }}>Follow Us</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span> </span>
          </div> */}
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
            <li style={{ marginBottom: 18 }}><a href="/#/terms-and-conditions" style={{ color: '#222', textDecoration: 'none' }}>Terms and Conditions</a></li>
            <li style={{ marginBottom: 18 }}><a href="/#/privacy-policy" style={{ color: '#222', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li style={{ marginBottom: 18 }}><a href="/#/faq" style={{ color: '#222', textDecoration: 'none' }}>FAQ</a></li>
            <li style={{ fontWeight: 600, marginBottom: 18 }}>
              {/* <a href="/#/tour-packages" style={{ color: '#222', textDecoration: 'none' }}>Popular Packages</a> */}
            </li>
            <li style={{ marginBottom: 0 }}>Best Travel Agency in India</li>
          </ul>
        </div>
        <div style={{ minWidth: 220, flex: 1, marginBottom: 24 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>GSTIN : <span style={{ fontWeight: 700 }}>07ASIPK7467P1ZU</span></div>
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

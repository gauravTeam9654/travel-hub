import "../style.css";

const MergedFooter = () => {
  return (
    <footer style={{
      background: "linear-gradient(160deg, #0b1120 0%, #111827 60%, #0b1120 100%)",
      padding: "80px 6% 36px",
      marginTop: 0,
      fontFamily: "'Poppins', sans-serif",
      color: "#e2e8f0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative top glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2,
        background: "linear-gradient(90deg, transparent, #ff7a18 40%, #ffb347 60%, transparent)",
        pointerEvents: "none",
      }} />
      {/* Radial glow blob */}
      <div style={{
        position: "absolute", top: "-80px", left: "10%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,122,24,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

        {/* ── Main grid ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, marginBottom: 56 }}>

          {/* Brand column */}
          <div style={{ flex: "1 1 240px", minWidth: 220 }}>
            <img src="/partners/logo.png" alt="TravelHub" style={{ width: 140, marginBottom: 20, filter: "brightness(1.1)" }} />
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Crafting unforgettable journeys across the Himalayas and beyond since 2012.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                {
                  href: "https://instagram.com/tripjyada", label: "Instagram",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2"/><circle cx="12" cy="12" r="4.5" stroke="#E1306C" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="#E1306C"/></svg>,
                },
                {
                  href: "https://facebook.com/tripjyada", label: "Facebook",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M22 12.06C22 6.55 17.52 2.08 12 2.08 6.48 2.08 2 6.55 2 12.06c0 4.97 3.66 9.09 8.44 9.88v-6.99H8.1v-2.89h2.34V9.41c0-2.3 1.37-3.57 3.46-3.57.99 0 2.03.18 2.03.18v2.24h-1.14c-1.12 0-1.47.7-1.47 1.42v1.71h2.5l-.4 2.89h-2.1v6.99C18.34 21.15 22 17.03 22 12.06z"/></svg>,
                },
                {
                  href: "https://wa.me/919558515518", label: "WhatsApp",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#25D366" d="M20.5 3.5A11 11 0 0 0 3.6 20.4l-1.1 4 4.1-1.1A11 11 0 1 0 20.5 3.5Zm-8.5 17c-1.7 0-3.3-.5-4.7-1.4l-.3-.2-2.8.8.8-2.7-.2-.3A8.6 8.6 0 1 1 12 20.5Z"/><path fill="#25D366" d="M16.9 13.7c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.9 1-.2.2-.3.2-.6.1a7 7 0 0 1-3.3-2.9c-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.2 3.9.6.3 1 .5 1.3.6.5.2 1 .2 1.4.1.4-.1 1.3-.5 1.5-1.1.2-.6.2-1 .1-1.1-.1-.1-.2-.1-.3-.2Z"/></svg>,
                },
                {
                  href: "mailto:info@travelhub.com", label: "Email",
                  svg: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" fill="#6ba3ff"/></svg>,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(255,122,24,0.2)"; e.currentTarget.style.borderColor = "rgba(255,122,24,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: "1 1 150px", minWidth: 140 }}>
            <div style={{ fontWeight: 700, marginBottom: 20, color: "#fff", fontSize: "0.95rem", letterSpacing: "0.05em" }}>Quick Links</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Home", href: "/#/" },
                { label: "About Us", href: "/#/about" },
                { label: "Our Gallery", href: "/#/gallery" },
                { label: "Destinations", href: "/#/destination" },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 14 }}>
                  <a href={l.href} style={{
                    color: "rgba(255,255,255,0.55)", textDecoration: "none",
                    fontSize: "0.9rem", transition: "color 0.2s",
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}
                  onMouseOver={e => e.currentTarget.style.color = "#ff9f1c"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                  >
                    <span style={{ color: "#ff7a18", fontSize: "0.6rem" }}>▶</span> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div style={{ flex: "1 1 150px", minWidth: 140 }}>
            <div style={{ fontWeight: 700, marginBottom: 20, color: "#fff", fontSize: "0.95rem", letterSpacing: "0.05em" }}>Legal</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Terms & Conditions", href: "/#/terms-and-conditions" },
                { label: "Privacy Policy", href: "/#/privacy-policy" },
                { label: "Best Travel Agency in India", href: "/#/" },
              ].map(l => (
                <li key={l.label} style={{ marginBottom: 14 }}>
                  <a href={l.href} style={{
                    color: "rgba(255,255,255,0.55)", textDecoration: "none",
                    fontSize: "0.9rem", transition: "color 0.2s",
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}
                  onMouseOver={e => e.currentTarget.style.color = "#ff9f1c"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                  >
                    <span style={{ color: "#ff7a18", fontSize: "0.6rem" }}>▶</span> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 20, color: "#fff", fontSize: "0.95rem", letterSpacing: "0.05em" }}>Contact Us</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📞", text: "9558515518 / 9083701454" },
                { icon: "✉️", text: "info@travelhub.com" },
                { icon: "📍", text: "Shivmandir, Siliguri, Darjeeling – 734011" },
                { icon: "🏢", text: "197, Jodhpur Gardens, Kolkata – 700045" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1rem", marginTop: 1, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.55 }}>{c.text}</span>
                </div>
              ))}
              <div style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", marginTop: 4 }}>
                GSTIN: <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>07ASIPK7467P1ZU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 28,
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: 16,
        }}>
          <div style={{ color: "rgba(255,255,255,0.30)", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} TravelHub Tourism. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <img src="/bni.svg"  alt="BNI"  style={{ width: 42, opacity: 0.5 }} />
            <img src="/iso.svg"  alt="ISO"  style={{ width: 42, opacity: 0.5 }} />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default MergedFooter;

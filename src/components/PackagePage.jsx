import React, { useState } from "react";
import "../PackagePage.css";
import Navbar from "./Navbar";
import { FaBed, FaCar, FaBinoculars, FaUtensils, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { sikkimPackages, bhutanPackages, darjeelingPackages, meghalayaPackages, arunachalPackages, gangtokPackages } from "../data/tourpackages";
import { mergePackages } from "../data/packageStore";
import Footer from "./Footer";

const allPackages = mergePackages([
  ...sikkimPackages,
  ...bhutanPackages,
  ...darjeelingPackages,
  ...meghalayaPackages,
  ...arunachalPackages,
  ...gangtokPackages,
]);

const PackagePage = () => {

  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  const pkg = allPackages.find(
    (p) => p.slug === decodedSlug
  );

  // Removed hotel category selection

  if (!pkg) return <div style={{padding: 40}}>Package not found.</div>;

  // Responsive check
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 700;

  return (
    <>
      <Navbar fixed />
      <div className="package-detail-main" style={{ background: '#fff', minHeight: '100vh' }}>
        <div className="image-gradient-container">
          <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="/Gradient.png" alt="Gradient Overlay" className="gradient-overlay" />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px 48px' }}>
            <h1 style={{ color: '#fff', fontSize: 36, fontWeight: 700, marginBottom: 8, textShadow: '0 2px 8px #0006' }}>{pkg.title}</h1>
          </div>
        </div>
        <div className="package-content-wrapper">
          {/* Mobile layout only for small screens */}
          {isMobile ? (
            <div style={{ maxWidth: 430, margin: '0 auto', padding: '0 8px' }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>{pkg.subtitle}</h2>
              <div className="icon-row-scroll responsive-icon-row">
                <div><FaMapMarkerAlt style={{ color: '#222', fontSize: 22, marginBottom: 2 }} /><span>{pkg.subtitle || pkg.location || pkg.title.split(' ')[0]}</span></div>
                <div><FaRegCalendarAlt style={{ color: '#222', fontSize: 20, marginBottom: 2 }} /><span>{pkg.days}</span></div>
                <div><FaBed style={{ color: '#bbb', fontSize: 22, marginBottom: 2 }} /><span style={{ color: '#bbb' }}>Hotels</span></div>
                <div><FaCar style={{ color: '#bbb', fontSize: 22, marginBottom: 2 }} /><span style={{ color: '#bbb' }}>Transport</span></div>
                <div><FaBinoculars style={{ color: '#bbb', fontSize: 22, marginBottom: 2 }} /><span style={{ color: '#bbb' }}>Sightseeing</span></div>
                <div><FaUtensils style={{ color: '#bbb', fontSize: 22, marginBottom: 2 }} /><span style={{ color: '#bbb' }}>Meals</span></div>
              </div>
              {/* Hotel category selection removed */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Tour Package Description</h3>
                <div style={{ fontSize: 14, color: '#222', lineHeight: 1.7 }}>{pkg.description || 'No description available.'}</div>
              </div>
              {pkg.itinerary && (
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Itinerary: {pkg.days} {pkg.subtitle ? pkg.subtitle : ''}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && typeof pkg.itinerary[0] === 'object' && pkg.itinerary[0] !== null && pkg.itinerary[0].day && pkg.itinerary[0].details ? (
                      pkg.itinerary.map((block, i) => (
                        <div key={i} style={{ background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16 }}>
                          <h4 style={{ color: '#ff6600', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{block.day}</h4>
                          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#222', margin: 0 }}>
                            {block.details.map((line, j) => (
                              typeof line === 'string' && line.trim() ? <li key={j} style={{ marginBottom: 6 }}>{line}</li> : null
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      (() => {
                        const dayBlocks = [];
                        let currentDay = null;
                        let currentItems = [];
                        pkg.itinerary.forEach((item, idx) => {
                          if (typeof item === 'string') {
                            const match = item.match(/^(Day \d+):?\s*(.*)$/i);
                            if (match) {
                              if (currentDay) {
                                dayBlocks.push({ day: currentDay, items: currentItems });
                              }
                              currentDay = match[1];
                              let rest = match[2];
                              if (rest && rest.includes('\n')) {
                                currentItems = rest.split(/\n/).map(s => s.trim()).filter(Boolean);
                              } else {
                                currentItems = rest ? [rest] : [];
                              }
                            } else {
                              if (item.includes('\n')) {
                                currentItems.push(...item.split(/\n/).map(s => s.trim()).filter(Boolean));
                              } else {
                                currentItems.push(item);
                              }
                            }
                          }
                        });
                        if (currentDay) {
                          dayBlocks.push({ day: currentDay, items: currentItems });
                        }
                        return dayBlocks.map((block, i) => (
                          <div key={i} style={{ background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16 }}>
                            <h4 style={{ color: '#ff6600', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{block.day}</h4>
                            <ul style={{ paddingLeft: 16, fontSize: 13, color: '#222', margin: 0 }}>
                              {block.items.map((line, j) => (
                                typeof line === 'string' && line.trim() ? <li key={j} style={{ marginBottom: 6 }}>{line}</li> : null
                              ))}
                            </ul>
                          </div>
                        ));
                      })()
                    )}
                  </div>
                </div>
              )}
              {/* FAQ section removed */}
              {(pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0) ? (
                <div className="inclusions-block" style={{ display: 'flex', gap: 32, margin: '24px 0 16px 0', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft: 0 }}>
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div style={{ minWidth: 140, flex: 1, textAlign: 'left' }}>
                      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, textAlign: 'left' }}>Inclusions</h2>
                      <ul style={{ paddingLeft: 0, fontSize: 13, color: '#222', listStyle: 'none' }}>
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                            <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', border: '2px solid #ff6600', color: '#ff6600', fontWeight: 700, textAlign: 'center', marginRight: 8, fontSize: 15, lineHeight: '18px', background: '#fff7f0' }}>⦿</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div style={{ minWidth: 140, flex: 1, textAlign: 'left' }}>
                      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, textAlign: 'left' }}>Exclusions</h2>
                      <ul style={{ paddingLeft: 0, fontSize: 13, color: '#222', listStyle: 'none' }}>
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                            <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: '50%', border: '2px solid #ff6600', color: '#ff6600', fontWeight: 700, textAlign: 'center', marginRight: 8, fontSize: 15, lineHeight: '18px', background: '#fff7f0' }}>✖</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}
              {/* Tour Guide Section for mobile */}
              {pkg.guide && (
                <div style={{ background: '#fafafa', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: '600', fontSize: '15px', marginBottom: '8px' }}>Tour Guide</h3>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Sikkim</div>
                    <ul style={{ paddingLeft: '16px', fontSize: '13px' }}>
                      {pkg.guide.sikkim.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>Arunachal Pradesh</div>
                    <ul style={{ paddingLeft: '16px', fontSize: '13px' }}>
                      {pkg.guide.arunachal.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Desktop/Laptop layout (original)
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
              <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12, marginTop: 32 }}>{pkg.subtitle}</h2>
              <div className="icon-row-scroll">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaMapMarkerAlt style={{ color: '#222', fontSize: 28, marginBottom: 4 }} />
                  <span style={{ fontWeight: 500, color: '#222', fontSize: 15 }}>{pkg.subtitle || pkg.location || pkg.title.split(' ')[0]}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaRegCalendarAlt style={{ color: '#222', fontSize: 26, marginBottom: 4 }} />
                  <span style={{ fontWeight: 500, color: '#222', fontSize: 15 }}>{pkg.days}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaBed style={{ color: '#bbb', fontSize: 28, marginBottom: 4 }} />
                  <span style={{ color: '#bbb', fontWeight: 500, fontSize: 15 }}>Hotels</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaCar style={{ color: '#bbb', fontSize: 28, marginBottom: 4 }} />
                  <span style={{ color: '#bbb', fontWeight: 500, fontSize: 15 }}>Transport</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaBinoculars style={{ color: '#bbb', fontSize: 28, marginBottom: 4 }} />
                  <span style={{ color: '#bbb', fontWeight: 500, fontSize: 15 }}>Sightseeing</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                  <FaUtensils style={{ color: '#bbb', fontSize: 28, marginBottom: 4 }} />
                  <span style={{ color: '#bbb', fontWeight: 500, fontSize: 15 }}>Meals</span>
                </div>
              </div>
              {/* Main Content */}
              <div className="package-two-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 32, maxWidth: 1400, margin: '0 auto', padding: '40px 16px 0 16px', flexWrap: 'wrap' }}>
                <div className="left-main" style={{ flex: 2, minWidth: 0 }}>
                  <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>{pkg.subtitle}</h2>
                  {/* Hotel category selection removed */}
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Tour Package Description</h3>
                    <div style={{ fontSize: 16, color: '#222', lineHeight: 1.7 }}>{pkg.description || 'No description available.'}</div>
                  </div>
                  {pkg.itinerary && (
                    <div style={{ marginBottom: 32 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Itinerary: {pkg.days} {pkg.subtitle ? pkg.subtitle : ''}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 && typeof pkg.itinerary[0] === 'object' && pkg.itinerary[0] !== null && pkg.itinerary[0].day && pkg.itinerary[0].details ? (
                          pkg.itinerary.map((block, i) => (
                            <div key={i} style={{ background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
                              <h4 style={{ color: '#ff6600', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{block.day}</h4>
                              <ul style={{ paddingLeft: 20, fontSize: 16, color: '#222', margin: 0 }}>
                                {block.details.map((line, j) => (
                                  typeof line === 'string' && line.trim() ? <li key={j} style={{ marginBottom: 6 }}>{line}</li> : null
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          (() => {
                            const dayBlocks = [];
                            let currentDay = null;
                            let currentItems = [];
                            pkg.itinerary.forEach((item, idx) => {
                              if (typeof item === 'string') {
                                const match = item.match(/^(Day \d+):?\s*(.*)$/i);
                                if (match) {
                                  if (currentDay) {
                                    dayBlocks.push({ day: currentDay, items: currentItems });
                                  }
                                  currentDay = match[1];
                                  let rest = match[2];
                                  if (rest && rest.includes('\n')) {
                                    currentItems = rest.split(/\n/).map(s => s.trim()).filter(Boolean);
                                  } else {
                                    currentItems = rest ? [rest] : [];
                                  }
                                } else {
                                  if (item.includes('\n')) {
                                    currentItems.push(...item.split(/\n/).map(s => s.trim()).filter(Boolean));
                                  } else {
                                    currentItems.push(item);
                                  }
                                }
                              }
                            });
                            if (currentDay) {
                              dayBlocks.push({ day: currentDay, items: currentItems });
                            }
                            return dayBlocks.map((block, i) => (
                              <div key={i} style={{ background: '#fafbfc', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
                                <h4 style={{ color: '#ff6600', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{block.day}</h4>
                                <ul style={{ paddingLeft: 20, fontSize: 16, color: '#222', margin: 0 }}>
                                  {block.items.map((line, j) => (
                                    typeof line === 'string' && line.trim() ? <li key={j} style={{ marginBottom: 6 }}>{line}</li> : null
                                  ))}
                                </ul>
                              </div>
                            ));
                          })()
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="right-sidebar" style={{ flex: 1, minWidth: 280, maxWidth: 400, position: 'relative', marginTop: 40 }}>
                  {/* FAQ section removed */}
                </div>
                {(pkg.inclusions && pkg.inclusions.length > 0) || (pkg.exclusions && pkg.exclusions.length > 0) ? (
                  <div className="inclusions-block" style={{ display: 'flex', gap: 140, margin: '56px 0 32px 0', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft: 0 }}>
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div style={{ minWidth: 280, flex: 1, textAlign: 'left' }}>
                        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 18, textAlign: 'left' }}>Inclusions</h2>
                        <ul style={{ paddingLeft: 0, fontSize: 18, color: '#222', listStyle: 'none' }}>
                          {pkg.inclusions.map((item, i) => (
                            <li key={i} style={{ marginBottom: 14, display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                              <span style={{ display: 'inline-block', width: 26, height: 26, borderRadius: '50%', border: '2px solid #ff6600', color: '#ff6600', fontWeight: 700, textAlign: 'center', marginRight: 12, fontSize: 20, lineHeight: '22px', background: '#fff7f0' }}>⦿</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pkg.exclusions && pkg.exclusions.length > 0 && (
                      <div style={{ minWidth: 280, flex: 1, textAlign: 'left' }}>
                        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 18, textAlign: 'left' }}>Exclusions</h2>
                        <ul style={{ paddingLeft: 0, fontSize: 18, color: '#222', listStyle: 'none' }}>
                          {pkg.exclusions.map((item, i) => (
                            <li key={i} style={{ marginBottom: 14, display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                              <span style={{ display: 'inline-block', width: 26, height: 26, borderRadius: '50%', border: '2px solid #ff6600', color: '#ff6600', fontWeight: 700, textAlign: 'center', marginRight: 12, fontSize: 20, lineHeight: '22px', background: '#fff7f0' }}>✖</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PackagePage;

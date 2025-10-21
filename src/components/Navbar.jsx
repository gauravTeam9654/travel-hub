import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
// import "../components/navbar.css";

const Navbar = ({ fixed = false }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const navigate = useNavigate();

  // Fetch destinations from Firebase
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "destinations"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDestinations(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileDropdownOpen(null);
  };
  const toggleMobileDropdown = (dropdown) =>
    setMobileDropdownOpen(mobileDropdownOpen === dropdown ? null : dropdown);

  const handleGuideNav = (slug, section) => {
    setActiveMenu(null);
    setTimeout(() => {
      navigate(`/destination/${encodeURIComponent(slug)}${section ? `#${section}` : ''}`);
    }, 0);
  };

  return (
    <nav className={`navbar ${fixed ? 'navbar-fixed navbar-bg-white' : ''}`}>
      {/* Mobile Header */}
      <div className="mobile-navbar-row">
        <button className="mobile-hamburger" onClick={toggleMobileMenu}>
          <span className="hamburger-line" style={{ background: '#222' }}></span>
          <span className="hamburger-line" style={{ background: '#222' }}></span>
          <span className="hamburger-line" style={{ background: '#222' }}></span>
        </button>
        <div className="mobile-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/logo-final.png" alt="TravelHub" style={{ height: '70px', width: 'auto', display: 'block' }} />
        </div>
      </div>

      {/* Desktop Logo */}
      <div className="navbar-desktop-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <img src="/logo-final.png" alt="TravelHub" style={{ height: '100px', width: 'auto', display: 'block' }} />
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links navbar-desktop-center">
        <li><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link></li>

        {/* Tour Packages Dropdown */}
        <li className="dropdown" onMouseEnter={() => handleMouseEnter("packages")} onMouseLeave={handleMouseLeave}>
          <span className="dropdown-title">
            Tour Packages {activeMenu === "packages" ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
          </span>
          {activeMenu === "packages" && (
            <div className="dropdown-menu mega-menu">
              {destinations.map(dest => (
                <div key={dest.slug || dest.id} style={{ marginRight: 24 }}>
                  <h4 style={{ color: '#ff6600', marginBottom: 8 }}>{dest.name}</h4>
                  <ul>
                    {dest.highlights && dest.highlights.length > 0 ? (
                      dest.highlights.map(pkg => (
                        <li key={pkg.title}>
                          <Link
                            to={`/destination/${encodeURIComponent(dest.name)}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            onClick={() => setActiveMenu(null)}
                          >
                            {pkg.title}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No packages available</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </li>

        {/* Tour Guide Dropdown */}
        {/* <li className="dropdown" onMouseEnter={() => handleMouseEnter("guide")} onMouseLeave={handleMouseLeave}>
          <span className="dropdown-title">
            Tour Guide {activeMenu === "guide" ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
          </span>
          {activeMenu === "guide" && (
            <div className="dropdown-menu mega-menu">
              {destinations.map(dest => (
                <div key={dest.slug || dest.id} style={{ marginRight: 24 }}>
                  <h4 style={{ color: '#ff6600', marginBottom: 8 }}>{dest.name}</h4>
                  <ul>
                    {dest.highlights?.length > 0 && (
                      <li>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleGuideNav(dest.slug, 'highlights')}>Places to Visit</span>
                      </li>
                    )}
                    {dest.monasteriesSection && (
                      <li>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleGuideNav(dest.slug, 'monasteries')}>Monasteries</span>
                      </li>
                    )}
                    {dest.lakesSection && (
                      <li>
                        <span style={{ cursor: 'pointer' }} onClick={() => handleGuideNav(dest.slug, 'lakes')}>Lakes</span>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </li> */}

        <li><Link to="/destination" style={{ textDecoration: 'none', color: 'inherit' }}>Destination</Link></li>
        <li><Link to="/backpacking" style={{ textDecoration: 'none', color: 'inherit' }}>Backpacking Tour</Link></li>
        <li><Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</Link></li>
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 30, paddingBottom: 20, borderBottom: '1px solid #eee' }}>
              <img src="/logo-final.png" alt="TravelHub" style={{ height: '100px', width: 'auto', margin: '0 auto 10px auto', display: 'block' }} />
              <button className="mobile-menu-close" style={{ alignSelf: 'flex-end', marginTop: -60, marginRight: 0 }} onClick={toggleMobileMenu}>×</button>
            </div>

            <ul className="mobile-nav-links">
              <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>

              {/* Mobile Tour Packages */}
              <li className="mobile-dropdown-item">
                <span className="mobile-dropdown-title" onClick={() => toggleMobileDropdown('packages')}>
                  Tour Packages {mobileDropdownOpen === 'packages' ? <FaChevronUp className="mobile-dropdown-icon" /> : <FaChevronDown className="mobile-dropdown-icon" />}
                </span>
                {mobileDropdownOpen === 'packages' && (
                  <ul className="mobile-submenu">
                    {destinations.map(dest => (
                      <li key={dest.slug || dest.id}>
                        <span className="mobile-submenu-title" style={{ color: '#ff6600' }}>{dest.name}</span>
                        {dest.packages?.length > 0 && (
                          <ul>
                            {dest.packages.map(pkg => (
                              <li key={pkg.slug}>
                                <Link to={`/package/${encodeURIComponent(pkg.slug)}`} onClick={toggleMobileMenu} style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}>
                                  {pkg.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Mobile Tour Guide */}
              {/* <li className="mobile-dropdown-item">
                <span className="mobile-dropdown-title" onClick={() => toggleMobileDropdown('guide')}>
                  Tour Guide {mobileDropdownOpen === 'guide' ? <FaChevronUp className="mobile-dropdown-icon" /> : <FaChevronDown className="mobile-dropdown-icon" />}
                </span>
                {mobileDropdownOpen === 'guide' && (
                  <ul className="mobile-submenu">
                    {destinations.map(dest => (
                      <li key={dest.slug || dest.id}>
                        <span className="mobile-submenu-title" style={{ color: '#ff6600' }}>{dest.name}</span>
                        {dest.highlights?.length > 0 && (
                          <li>
                            <span style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}
                                  onClick={() => { handleGuideNav(dest.slug, 'highlights'); toggleMobileMenu(); }}>
                              Places to Visit
                            </span>
                          </li>
                        )}
                        {dest.monasteriesSection && (
                          <li>
                            <span style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}
                                  onClick={() => { handleGuideNav(dest.slug, 'monasteries'); toggleMobileMenu(); }}>
                              Monasteries
                            </span>
                          </li>
                        )}
                        {dest.lakesSection && (
                          <li>
                            <span style={{ color: '#222', textDecoration: 'none', cursor: 'pointer' }}
                                  onClick={() => { handleGuideNav(dest.slug, 'lakes'); toggleMobileMenu(); }}>
                              Lakes
                            </span>
                          </li>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li> */}

              <li><Link to="/destination" onClick={toggleMobileMenu}>Destination</Link></li>
              <li><Link to="/backpacking" onClick={toggleMobileMenu}>Backpacking Tour</Link></li>
              <li><Link to="/about" onClick={toggleMobileMenu}>About Us</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

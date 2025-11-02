import React from 'react';
import { bhutanPackages } from '../data/packages';
import PackageCard from './PackageCard';

const PopularPackages = () => {
  return (
    <section className="popular-packages-section">
      <h2>Popular International Tour Packages</h2>
      <div className="popular-packages-cards">
        {bhutanPackages.map((pkg, idx) => (
          <div className="package-card" key={idx}>
            <div
              className="package-card-bg"
              style={{
                backgroundImage: `url(${pkg.image})`,
              }}
            ></div>
            <div className="package-card-overlay">
              <div className="package-card-content">
                <div className="package-card-title">{pkg.title}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="package-card">
          <div
            className="package-card-bg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')",
            }}
          ></div>
          <div className="package-card-overlay">
            <div className="package-card-content">
              <div className="package-card-title">Random Mountain Tour</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;

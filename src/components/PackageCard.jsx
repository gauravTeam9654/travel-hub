
import '../PackageCard.css';

function PackageCard({ image, title, subtitle }) {
  return (
    <div className="tour-package-card">
      <img
        src={image}
        alt={title}
      />
      <div className="card-overlay">
        <div className="card-title">{title}</div>
      </div>
    </div>
  );
}

export default PackageCard;

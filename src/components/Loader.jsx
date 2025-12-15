import "./loader.css";

const Loader = ({ open }) => {
  if (!open) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-spinner" />
    </div>
  );
};

export default Loader;

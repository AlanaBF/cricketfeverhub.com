import "../../assets/styles/components.css";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-spinner-container" role="status" aria-live="polite">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

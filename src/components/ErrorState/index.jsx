import "../../assets/styles/components.css";

const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="error-state-container" role="alert">
      <div className="error-state-icon">!</div>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <button className="btn btn-info error-retry-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;

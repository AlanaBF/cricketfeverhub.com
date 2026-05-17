import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/pages.css';
import '../../assets/styles/components.css';

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found - Cricket Fever Hub";
  }, []);

  return (
    <div className="notFoundPageContainer">
      <div className="notFoundPageContent">
        <div className="notFoundPageText">
          <p>Oops! That delivery went wide...</p>
          <span>404</span>
          <p>Page Not Found</p>
          <Link to="/">Back to the Pavilion</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

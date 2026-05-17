import { useEffect } from 'react';
import '../../assets/styles/pages.css';
import LiveMatches from '../../components/LiveMatches/index';
import "../../assets/styles/components.css";

function LiveMatchesPage() {
  useEffect(() => {
    document.title = "Live Matches - Cricket Fever Hub";
  }, []);

  return (
    <div className="pageBackground">
      <LiveMatches />
    </div>
  );
}

export default LiveMatchesPage;

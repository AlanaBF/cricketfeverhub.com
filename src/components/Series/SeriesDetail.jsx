import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSeriesMatches, getSeriesPointsTable } from "../../utils/getSeriesDetail_API";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";

const SeriesDetail = () => {
  const { seriesId } = useParams();
  const [matches, setMatches] = useState([]);
  const [pointsTable, setPointsTable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeriesDetail = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [matchesResponse, pointsResponse] = await Promise.allSettled([
        getSeriesMatches(seriesId),
        getSeriesPointsTable(seriesId),
      ]);

      if (matchesResponse.status === "fulfilled") {
        const matchData = matchesResponse.value;
        const matchList = matchData.matchDetails || matchData.matches || [];
        setMatches(matchList);
      }

      if (pointsResponse.status === "fulfilled") {
        setPointsTable(pointsResponse.value);
      }
    } catch (fetchError) {
      console.error("Error fetching series detail:", fetchError);
      setError("Unable to load series details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeriesDetail();
  }, [seriesId]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(parseInt(timestamp)).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  if (isLoading) return <LoadingSpinner message="Loading series details..." />;
  if (error) return <ErrorState message={error} onRetry={fetchSeriesDetail} />;

  return (
    <div className="series-detail-container">
      <Link to="/series" className="series-back-link">Back to Series</Link>

      {pointsTable && renderPointsTable(pointsTable)}

      <h2 className="series-section-title">Matches</h2>
      {matches.length > 0 ? (
        <div className="series-matches-list">
          {matches.map((matchGroup, groupIndex) => {
            const matchDetails = matchGroup.matchDetailsMap;
            if (!matchDetails) return null;

            return (
              <div key={groupIndex}>
                {Object.values(matchDetails).flat().map((match, matchIndex) => {
                  const info = match.matchInfo || match;
                  if (!info.matchId) return null;

                  return (
                    <div key={info.matchId || matchIndex} className="series-match-card">
                      <div className="series-match-teams">
                        {info.team1?.teamName || "TBD"} vs {info.team2?.teamName || "TBD"}
                      </div>
                      <div className="series-match-meta">
                        <span>{info.matchFormat}</span>
                        <span>{formatDate(info.startDate)}</span>
                        {info.venueInfo && <span>{info.venueInfo.ground}, {info.venueInfo.city}</span>}
                      </div>
                      {info.status && <div className="series-match-status">{info.status}</div>}
                      <div className="series-match-actions">
                        <Link to={`/scorecard/${info.matchId}`} className="series-match-link">
                          Scorecard
                        </Link>
                        <Link to={`/commentary/${info.matchId}`} className="series-match-link">
                          Commentary
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="pageDescription">No matches available for this series.</p>
      )}
    </div>
  );
};

const renderPointsTable = (pointsData) => {
  const tables = pointsData.pointsTable || pointsData.tables || [];

  if (!tables.length) return null;

  return (
    <div className="points-table-section">
      <h2 className="series-section-title">Points Table</h2>
      {tables.map((table, tableIndex) => (
        <div key={tableIndex} className="table-scroll-wrapper">
          <table className="points-table" aria-label="Series points table">
            <thead>
              <tr>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>D</th>
                <th>Pts</th>
                <th>NRR</th>
              </tr>
            </thead>
            <tbody>
              {(table.pointsTableInfo || table.teams || []).map((team, teamIndex) => (
                <tr key={teamIndex}>
                  <td>{team.teamName || team.name}</td>
                  <td>{team.matchesPlayed || team.played}</td>
                  <td>{team.matchesWon || team.won}</td>
                  <td>{team.matchesLost || team.lost}</td>
                  <td>{team.matchesDrawn || team.drawn || 0}</td>
                  <td className="rankings-rating">{team.points || team.pts}</td>
                  <td>{team.nrr || team.netRunRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SeriesDetail;

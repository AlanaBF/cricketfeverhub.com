import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getRankings from "../../utils/getRankings_API";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";

const FORMATS = [
  { label: "Test", value: "test" },
  { label: "ODI", value: "odi" },
  { label: "T20I", value: "t20i" },
];

const CATEGORIES = [
  { label: "Batsmen", value: "batsmen" },
  { label: "Bowlers", value: "bowlers" },
  { label: "All-rounders", value: "allrounders" },
];

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("test");
  const [selectedCategory, setSelectedCategory] = useState("batsmen");
  const [teamFilter, setTeamFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRankings(selectedCategory, selectedFormat);
      const rankList = data.rank || data.ranks || data.rankings || [];
      setRankings(rankList);
    } catch (fetchError) {
      console.error("Error fetching rankings:", fetchError);
      setError("Unable to load rankings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [selectedFormat, selectedCategory]);

  const uniqueTeams = [...new Set(rankings.map((player) => player.country || player.team || player.teamName).filter(Boolean))];

  const filteredRankings = teamFilter
    ? rankings.filter((player) => (player.country || player.team || player.teamName) === teamFilter)
    : rankings;

  return (
    <div className="rankings-container">
      <h1 className="pageTitle">ICC Rankings</h1>

      <div className="rankings-filters">
        <div className="rankings-filter-group" role="tablist" aria-label="Format selection">
          {FORMATS.map((format) => (
            <button
              key={format.value}
              className={`rankings-filter-button format ${selectedFormat === format.value ? "active" : ""}`}
              onClick={() => setSelectedFormat(format.value)}
              role="tab"
              aria-selected={selectedFormat === format.value}
            >
              {format.label}
            </button>
          ))}
        </div>
        <div className="rankings-filter-group" role="tablist" aria-label="Category selection">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              className={`rankings-filter-button category ${selectedCategory === category.value ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.value)}
              role="tab"
              aria-selected={selectedCategory === category.value}
            >
              {category.label}
            </button>
          ))}
        </div>
        {uniqueTeams.length > 0 && (
          <select
            className="rankings-team-filter"
            value={teamFilter}
            onChange={(event) => setTeamFilter(event.target.value)}
            aria-label="Filter by team"
          >
            <option value="">All Teams</option>
            {uniqueTeams.sort().map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        )}
      </div>

      {isLoading && <LoadingSpinner message="Loading rankings..." />}
      {error && <ErrorState message={error} onRetry={fetchRankings} />}

      {!isLoading && !error && (
        <div className="table-scroll-wrapper">
          <table className="rankings-table" aria-label={`${selectedCategory} ${selectedFormat} rankings`}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Team</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredRankings.map((player, rankIndex) => (
                <tr key={player.id || rankIndex}>
                  <td className="rankings-rank">{player.rank || rankIndex + 1}</td>
                  <td>
                    <Link to={`/player/${player.id}`} className="rankings-player-link">
                      {player.name || player.playerName}
                    </Link>
                  </td>
                  <td>{player.country || player.team || player.teamName}</td>
                  <td className="rankings-rating">{player.rating || player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Rankings;

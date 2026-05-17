import { useEffect, useState } from "react";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";
import CricketHero from "../../assets/Cricketbanner.jpeg";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isDesiredSeriesMatch = (seriesMatch) => {
    const seriesName = seriesMatch.seriesAdWrapper?.seriesName;
    if (!seriesName) return false;

    if (selectedSeries === "All") return true;
    if (selectedSeries === "Women") {
      return seriesName.toLowerCase().includes("women");
    }
    return seriesName === selectedSeries;
  };

  const fetchLiveMatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getLiveMatchesData();
      if (data && data.typeMatches) {
        setMatches(data.typeMatches);
      }
    } catch (fetchError) {
      console.error("Error fetching live matches data:", fetchError);
      setError("Unable to load live matches. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  useEffect(() => {
    let filteredData = [];

    if (selectedSeries === "All") {
      filteredData = matches.reduce((accumulated, typeMatch) => {
        const seriesMatches = typeMatch.seriesMatches || [];
        const matchesInSeries = seriesMatches.reduce(
          (seriesAccumulated, seriesMatch) => {
            const seriesAdWrapper = seriesMatch.seriesAdWrapper;
            if (seriesAdWrapper && seriesAdWrapper.matches) {
              return [...seriesAccumulated, ...seriesAdWrapper.matches];
            }
            return seriesAccumulated;
          },
          []
        );
        return [...accumulated, ...matchesInSeries];
      }, []);
    } else {
      if (!matches || matches.length === 0) {
        filteredData = [];
      } else {
        filteredData = matches.reduce((accumulated, typeMatch) => {
          const seriesMatches = typeMatch.seriesMatches || [];
          const matchesInSeries = seriesMatches.reduce(
            (seriesAccumulated, seriesMatch) => {
              const seriesAdWrapper = seriesMatch.seriesAdWrapper;
              if (
                isDesiredSeriesMatch(seriesMatch) &&
                seriesAdWrapper &&
                seriesAdWrapper.matches
              ) {
                return [...seriesAccumulated, ...seriesAdWrapper.matches];
              }
              return seriesAccumulated;
            },
            []
          );
          return [...accumulated, ...matchesInSeries];
        }, []);
      }
    }

    const sortedData = filteredData.sort((firstMatch, secondMatch) => {
      const firstTimestamp = parseInt(firstMatch.matchInfo.startDate);
      const secondTimestamp = parseInt(secondMatch.matchInfo.startDate);
      return firstTimestamp - secondTimestamp;
    });

    setFilteredMatches(sortedData);
  }, [matches, selectedSeries]);

  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const extractSeriesNames = () => {
    const names = new Set();
    matches.forEach((typeMatch) => {
      const seriesMatches = typeMatch.seriesMatches || [];
      seriesMatches.forEach((seriesMatch) => {
        const seriesName = seriesMatch.seriesAdWrapper?.seriesName;
        if (seriesName) names.add(seriesName);
      });
    });
    return [...names].sort();
  };

  const availableSeries = extractSeriesNames();

  const seriesFilters = [
    { label: "All", value: "All" },
    { label: "Women's Cricket", value: "Women" },
    ...availableSeries
      .filter((name) => !name.toLowerCase().includes("women"))
      .slice(0, 8)
      .map((name) => ({ label: name, value: name })),
  ];

  if (isLoading) {
    return (
      <div className="live-matches">
        <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
        <h1 className="pageTitle">Live Matches</h1>
        <LoadingSpinner message="Fetching live matches..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-matches">
        <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
        <h1 className="pageTitle">Live Matches</h1>
        <ErrorState message={error} onRetry={fetchLiveMatches} />
      </div>
    );
  }

  return (
    <div className="live-matches">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />

      <h1 className="pageTitle">Live Matches</h1>
      <div className="quick-filters" role="tablist" aria-label="Filter by series">
        {seriesFilters.map((filter) => (
          <button
            key={filter.value}
            className={`quick-filter-button ${selectedSeries === filter.value ? "active" : ""}`}
            onClick={() => setSelectedSeries(filter.value)}
            role="tab"
            aria-selected={selectedSeries === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredMatches.length > 0 ? (
        <>
          {filteredMatches.map((match) => (
            <div
              key={match.matchInfo.matchId}
              className="match-container"
              role="region"
              aria-label={`${match.matchInfo.team1.teamName} vs ${match.matchInfo.team2.teamName}`}
            >
              <div className="teams-heading">
                {match.matchInfo.team1.teamName} vs{" "}
                {match.matchInfo.team2.teamName}
              </div>
              <div className="teams-subheading">
                {match.matchInfo.venueInfo.ground},{" "}
                {match.matchInfo.venueInfo.city}
              </div>
              <div className="table-scroll-wrapper">
                <table className="live-match-container" aria-label="Match details">
                  <thead>
                    <tr className="live-match-table">
                      <th className="live-match-table">Series Name</th>
                      <th className="live-match-table">Match Format</th>
                      <th className="live-match-table">Start Date</th>
                      <th className="live-match-table">End Date</th>
                      <th className="live-match-table">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="live-match-table">{match.matchInfo.seriesName}</td>
                      <td className="live-match-table">{match.matchInfo.matchFormat}</td>
                      <td className="live-match-table">{formatDate(match.matchInfo.startDate)}</td>
                      <td className="live-match-table">{formatDate(match.matchInfo.endDate)}</td>
                      <td className="live-match-table">{match.matchInfo.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Link
                to={`/scorecard/${match.matchInfo.matchId}`}
                state={{
                  matchData: match,
                  venueInfo: match.matchInfo.venueInfo,
                }}
              >
                <Button aria-label={`View scorecard for ${match.matchInfo.team1.teamName} vs ${match.matchInfo.team2.teamName}`}>
                  View Scorecard
                </Button>
              </Link>
              <Link to={`/commentary/${match.matchInfo.matchId}`}>
                <Button aria-label={`View commentary for ${match.matchInfo.team1.teamName} vs ${match.matchInfo.team2.teamName}`}>
                  View Match Commentary
                </Button>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p className="pageDescription">No live matches available.</p>
      )}
    </div>
  );
};

export default LiveMatches;

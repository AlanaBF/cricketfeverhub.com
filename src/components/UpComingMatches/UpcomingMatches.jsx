import { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../utils/getUpcomingMatches_API";
import "./UpcomingMatches.css";
import { Modal, Button } from "react-bootstrap";
import Map from "../../utils/Leaflet/Leaflet_API";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);
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

  const fetchUpcomingMatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUpcomingMatchesData();
      setMatches(data.typeMatches);
    } catch (fetchError) {
      console.error("Error fetching upcoming matches data:", fetchError);
      setError("Unable to load upcoming matches. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMatches();
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

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
  };

  const handleMatchKeyDown = (event, match) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedMatch(match);
    }
  };

  const MatchModal = ({ match, onClose }) => {
    const { team1, team2, startDate, venueInfo, matchFormat } = match.matchInfo;

    return (
      <Modal
        show={true}
        onHide={onClose}
        aria-labelledby="match-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="match-modal-title">
            {team1.teamName} vs {team2.teamName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Start Date: {formatDate(startDate)}</p>
          <p>{matchFormat}</p>
          <p>
            Venue: {venueInfo.ground}, {venueInfo.city}
          </p>
          <Map venue={venueInfo} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <div className="live-matches">
        <h1 className="pageTitle">Upcoming Matches</h1>
        <LoadingSpinner message="Fetching upcoming matches..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-matches">
        <h1 className="pageTitle">Upcoming Matches</h1>
        <ErrorState message={error} onRetry={fetchUpcomingMatches} />
      </div>
    );
  }

  return (
    <div className="live-matches">
      <h1 className="pageTitle">Upcoming Matches</h1>
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
              key={match.matchInfo.matchId || `${match.matchInfo.team1?.teamName}-${match.matchInfo.startDate}`}
              className="match-container"
              role="button"
              tabIndex={0}
              onClick={() => handleMatchClick(match)}
              onKeyDown={(event) => handleMatchKeyDown(event, match)}
              aria-label={`View details for ${match.matchInfo?.team1?.teamName} vs ${match.matchInfo?.team2?.teamName}. Press Enter for details.`}
            >
              <h2>
                {match.matchInfo?.team1?.teamName} vs{" "}
                {match.matchInfo?.team2?.teamName}
              </h2>
              <p>Click for details</p>
            </div>
          ))}
        </>
      ) : (
        <p className="pageDescription">No upcoming matches available.</p>
      )}

      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
};

export default UpcomingMatches;

import React, { useEffect, useState } from "react";
import getUpcomingMatchesData from "../../utils/getUpcomingMatches_API";
import "./UpcomingMatches.css";
import { Modal, Button } from "react-bootstrap";
import Map from "../../utils/Leaflet/Leaflet_API";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedMatch, setSelectedMatch] = useState(null);

  const isDesiredSeriesMatch = (seriesMatch) => {
    const seriesName = seriesMatch.seriesAdWrapper?.seriesName;

    if (selectedSeries === "All") {
      return true;
    } else if (selectedSeries === "The Ashes, 2024") {
      return (
        seriesName === "The Ashes, 2024" || seriesName === "Womens Ashes, 2024"
      );
    } else {
      return seriesName && seriesName.includes(selectedSeries);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpcomingMatchesData();
        setMatches(data.typeMatches);
      } catch (error) {
        console.error("Error fetching upcoming matches data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter the matches based on criteria
    let filteredData = [];

    if (selectedSeries === "All") {
      filteredData = matches.reduce((filtered, typeMatch) => {
        const seriesMatches = typeMatch.seriesMatches || [];
        const filteredSeriesMatches = seriesMatches.reduce(
          (filteredSeries, seriesMatch) => {
            const seriesAdWrapper = seriesMatch.seriesAdWrapper;
            if (seriesAdWrapper && seriesAdWrapper.matches) {
              return [...filteredSeries, ...seriesAdWrapper.matches];
            }
            return filteredSeries;
          },
          []
        );
        return [...filtered, ...filteredSeriesMatches];
      }, []);
    } else {
      filteredData = matches.reduce((filtered, typeMatch) => {
        const seriesMatches = typeMatch.seriesMatches || [];
        const filteredSeriesMatches = seriesMatches.reduce(
          (filteredSeries, seriesMatch) => {
            const seriesAdWrapper = seriesMatch.seriesAdWrapper;
            if (
              isDesiredSeriesMatch(seriesMatch) &&
              seriesAdWrapper &&
              seriesAdWrapper.matches
            ) {
              return [...filteredSeries, ...seriesAdWrapper.matches];
            }
            return filteredSeries;
          },
          []
        );
        return [...filtered, ...filteredSeriesMatches];
      }, []);
    }

    // Sort matches by start date
    const sortedData = filteredData.sort((a, b) => {
      const timestampA = parseInt(a.matchInfo.startDate);
      const timestampB = parseInt(b.matchInfo.startDate);

      // Compare the timestamps
      return timestampA - timestampB;
    });

    setFilteredMatches(sortedData);
  }, [matches, selectedSeries]);

  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const seriesNames = [
    "All",
    "T20 Blast 2024",
    "County Championship Division One 2024",
    "Women",
    "The Ashes, 2024",
    "The Hundred Mens Competition 2024",
    "The Hundred Womens Competition 2024",
  ];

  const handleSeriesChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "Women") {
      setSelectedSeries("Women");
    } else {
      setSelectedSeries(selectedValue);
    }
  };

  const MatchModal = ({ match, onClose }) => {
    const { team1, team2, startDate, venueInfo, matchFormat } = match.matchInfo;

    return (
      <div>
        <Modal show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
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
      </div>
    );
  };

  return (
    <div className="live-matches">
      <h1 className="pageTitle">Upcoming Matches</h1>
      <div className="filter-container">
        <label className="pageDescription" htmlFor="series-select">
          Filter by Series:
        </label>
        <select
          id="series-select"
          value={selectedSeries}
          onChange={handleSeriesChange}
        >
          {seriesNames.map((series, index) => (
            <option key={index} value={series}>
              {series}
            </option>
          ))}
        </select>
      </div>

      {filteredMatches.length > 0 ? (
        <>
          {filteredMatches.map((match, index) => (
            <div
              key={index}
              className="match-container"
              onClick={() => setSelectedMatch(match)}
            >
              <h2>
                {match.matchInfo?.team1?.teamName} vs{" "}
                {match.matchInfo?.team2?.teamName}
              </h2>
              Click for details
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

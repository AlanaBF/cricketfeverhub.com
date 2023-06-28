import React, { useEffect, useState } from "react";
import {  Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getLiveMatchesData from "../../utils/getLiveMatches_API";
import getScorecard from "../../utils/getScorecard_API";
import "../../assets/styles/components.css";
import MatchCommentary from "../Comms/MatchComms";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [scorecardData, setScorecardData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLiveMatchesData();
        const matchesData = data?.typeMatches.flatMap((typeMatch) =>
          typeMatch.seriesMatches.filter(
            (seriesMatch) => seriesMatch.seriesAdWrapper
          )
        );
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching live matches data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = matches.flatMap(
      (seriesMatch) => seriesMatch.seriesAdWrapper.matches
    );
    setFilteredMatches(filteredData);
  }, [matches]);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString();
  };

  const handleViewScorecard = async (matchId) => {
    try {
      const response = await getScorecard(matchId);
      setScorecardData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching scorecard data:", error);
    }
  };

  const handleViewMatchComments = async (matchId) => {
    try {
        setSelectedMatch(matchId);
        setShowModal(true);
    } catch (error) {
      console.error("Error fetching match comments:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="live-matches">
      <h1>Live Matches</h1>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match, index) => (
          <div key={index} className="match-container">
            <p>
              {match.matchInfo.team1.teamName} vs{" "}
              {match.matchInfo.team2.teamName}
            </p>
            <p>{match.matchInfo.seriesName}</p>
            <p>Match Format: {match.matchInfo.matchFormat}</p>
            <p>
              Start Date: {convertTimestampToDate(match.matchInfo.startDate)}
            </p>
            <p>End Date: {convertTimestampToDate(match.matchInfo.endDate)}</p>
            <p>Status: {match.matchInfo.status}</p>
            <p>MatchId: {match.matchInfo.matchId}</p>
            <p>
              Venue: {match.matchInfo.venueInfo.ground},{" "}
              {match.matchInfo.venueInfo.city}
            </p>
            <table className="score-table">
              <thead>
                <tr>
                  <th>Innings</th>
                  <th>{match.matchInfo.team1.teamName}</th>
                  <th>{match.matchInfo.team2.teamName}</th>
                </tr>
              </thead>
              <tbody>
                {match.matchScore ? (
                  <>
                    <tr>
                      <td>1</td>
                      <td>
                        <li>
                          Runs: {match.matchScore.team1Score?.inngs1?.runs}
                        </li>
                        <li>
                          Wickets:{" "}
                          {match.matchScore.team1Score?.inngs1?.wickets}
                        </li>
                        <li>
                          Overs: {match.matchScore.team1Score?.inngs1?.overs}
                        </li>
                      </td>

                      <td>
                        <li>
                          Runs: {match.matchScore.team2Score?.inngs1?.runs}
                        </li>
                        <li>
                          Wickets:{" "}
                          {match.matchScore.team2Score?.inngs1?.wickets}
                        </li>
                        <li>
                          Overs: {match.matchScore.team2Score?.inngs1?.overs}
                        </li>
                      </td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>
                        <li>
                          Runs: {match.matchScore.team1Score?.inngs2?.runs}
                        </li>
                        <li>
                          Wickets:{" "}
                          {match.matchScore.team1Score?.inngs2?.wickets}
                        </li>
                        <li>
                          Overs: {match.matchScore.team1Score?.inngs2?.overs}
                        </li>
                      </td>

                      <td>
                        <li>
                          Runs: {match.matchScore.team2Score?.inngs2?.runs}
                        </li>
                        <li>
                          Wickets:{" "}
                          {match.matchScore.team2Score?.inngs2?.wickets}
                        </li>
                        <li>
                          Overs: {match.matchScore.team2Score?.inngs2?.overs}
                        </li>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="3">Match score not available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Button
              onClick={() => navigate(`/scorecard/${match.matchInfo.matchId}`)}
            >
              View Scorecard
            </Button>
            <Button
              variant="primary"
              onClick={() => handleViewMatchComments(match.matchInfo.matchId)}
            >
              Show Match Comments
            </Button>

            <Modal show={showModal} onHide={toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Match Comments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MatchCommentary matchId={selectedMatch} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))
      ) : (
        <p>No live matches available.</p>
      )}
    </div>
  );
};

export default LiveMatches;

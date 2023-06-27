import React from "react";
import { Table } from "react-bootstrap";

const PlayerProfileCard = ({ playerInfo }) => {
  const {
    name,
    nickName,
    role,
    bat,
    bowl,
    DoB,
    birthPlace,
    intlTeam,
    teams,
    image,
    bio,
    rankings,
  } = playerInfo;

  return (
    <div className="player-profile-card">
      <div className="profile-header">
        <img src={image} alt="Player Image" />
        <h2>{name}</h2>
        <p>Nickname: {nickName}</p>
      </div>
      <div className="profile-details">
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Batting Style:</strong> {bat}
        </p>
        <p>
          <strong>Bowling Style:</strong> {bowl}
        </p>
        <p>
          <strong>Date of Birth:</strong> {DoB}
        </p>
        <p>
          <strong>Birth Place:</strong> {birthPlace}
        </p>
        <p>
          <strong>International Team:</strong> {intlTeam}
        </p>
        <p>
          <strong>Teams:</strong> {teams}
        </p>
          <p>
            <strong>Rankings:</strong>{" "}
          </p>
          <Table striped bordered>
      <thead>
        <tr>
          <th>Category</th>
          <th>Test Rank</th>
          <th>Best Test Rank</th>
          <th>Best ODI Rank</th>
          <th>Best T20 Rank</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Batting</td>
          <td>{rankings.bat[0].testRank}</td>
          <td>{rankings.bat[0].testBestRank}</td>
          <td>{rankings.bat[0].odiBestRank}</td>
          <td>{rankings.bat[0].t20BestRank}</td>
        </tr>
        <tr>
          <td>Bowling</td>
          <td>{rankings.bowl[0].testBestRank}</td>
          <td>{rankings.bowl[0].odiBestRank}</td>
          <td>{rankings.bowl[0].t20BestRank}</td>
        </tr>
      </tbody>
    </Table>
      </div>
      <p
        className="profile-bio"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {bio &&
          bio
            .split(/<br\/><br\/>|<b>|<\/b>/)
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </p>
    </div>
  );
};

export default PlayerProfileCard;

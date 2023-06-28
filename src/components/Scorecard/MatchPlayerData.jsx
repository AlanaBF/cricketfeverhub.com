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
        <div>Nickname: {nickName}</div>
      </div>
      <div className="profile-details">
        <div>
          <strong>Role:</strong> {role}
        </div>
        <div>
          <strong>Batting Style:</strong> {bat}
        </div>
        <div>
          <strong>Bowling Style:</strong> {bowl}
        </div>
        <div>
          <strong>Date of Birth:</strong> {DoB}
        </div>
        <div>
          <strong>Birth Place:</strong> {birthPlace}
        </div>
        <div>
          <strong>International Team:</strong> {intlTeam}
        </div>
        <div>
          <strong>Teams:</strong> {teams}
        </div>
          <div>
            <strong>Rankings:</strong>{" "}
          </div>
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
      <div
        className="profile-bio"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {bio &&
          bio
            .split(/<br\/><br\/>|<b>|<\/b>/)
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  );
};

export default PlayerProfileCard;

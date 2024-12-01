import React from "react";
import "../../assets/styles/components.css";

const PlayerProfileCard = ({ playerInfo }) => {
  
  if (!playerInfo) {
    return <div>No player information available</div>;
  }

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
    faceImageId,
  } = playerInfo;

  const imageURL = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${faceImageId}/i.jpg?p=de`;

  const safeBio =
    bio &&
    typeof bio === "string" &&
    bio
      .replace(/<\/?b>/g, "")
      .replace(/<br\/><br\/>/g, "<br/>")
      .split("<br/>");

  return (
    <div className="player-profile-card">
      <div className="profile-header">
        <img
          src={imageURL || "/CricketImage.jpeg"}
          alt={`${name} Image`}
          onError={(e) => (e.target.src = "/CricketImage.jpeg")}
        />
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
      </div>
      <div
        className="profile-bio"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {safeBio
          ? safeBio.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          : "No biography available"}
      </div>
    </div>
  );
};

export default PlayerProfileCard;



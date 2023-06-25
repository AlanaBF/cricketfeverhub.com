import React from "react";

const PlayerProfileCard = ({ playerInfo }) => {
  const {
    name,
    nickName,
    bat,
    bowl,
    DoB,
    birthPlace,
    intlTeam,
    teams,
    image,
    bio,
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
          <strong>Role:</strong> {playerInfo.role}
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
      </div>
      <div className="profile-bio" style={{ maxHeight: '200px', overflowY: 'auto' }}>
  {bio &&
    bio
      .split(/<br\/><br\/>|<b>|<\/b>/)
      .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
</div>



    </div>
  );
};

export default PlayerProfileCard;


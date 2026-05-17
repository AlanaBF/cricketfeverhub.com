import getCricbuzzImageUrl from "../../utils/getCricbuzzImageUrl";
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
    bio,
    image,
    faceImageId,
  } = playerInfo;

  const imageURL = faceImageId ? getCricbuzzImageUrl(faceImageId) : image;

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
          alt={`${name} profile photo`}
          onError={(event) => (event.target.src = "/CricketImage.jpeg")}
        />
        <h2>{name}</h2>
        {nickName && <div>Nickname: {nickName}</div>}
      </div>
      <div className="profile-details">
        {role && (
          <div><strong>Role:</strong> {role}</div>
        )}
        {bat && (
          <div><strong>Batting Style:</strong> {bat}</div>
        )}
        {bowl && (
          <div><strong>Bowling Style:</strong> {bowl}</div>
        )}
        {DoB && (
          <div><strong>Date of Birth:</strong> {DoB}</div>
        )}
        {birthPlace && (
          <div><strong>Birth Place:</strong> {birthPlace}</div>
        )}
        {intlTeam && (
          <div><strong>International Team:</strong> {intlTeam}</div>
        )}
        {teams && (
          <div><strong>Teams:</strong> {teams}</div>
        )}
      </div>
      <div
        className="profile-bio"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {safeBio
          ? safeBio.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)
          : "No biography available"}
      </div>
    </div>
  );
};

export default PlayerProfileCard;

import { Button, Card } from "react-bootstrap";
import "../../assets/styles/components.css";
import "../../assets/styles/pages.css";

const PlayerCard = ({ id, name, teamName, image }) => {
  return (
    <Card key={id} className="playerCard">
      <Card.Img
        className="playerCardImage"
        variant="top"
        src={image}
        alt={`${name} profile photo`}
        onError={(event) => {
          event.target.onerror = null;
          event.target.src = "/CricketImage.jpeg";
        }}
      />
      <Card.Body className="playerCardBody">
        <Card.Title className="playerCardTitle">Player Name: {name}</Card.Title>
        <Card.Text className="playerCardText">Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button className="playerCardButton" variant="primary" aria-label={`View profile for ${name}`}>
        View Player Profile
      </Button>
    </Card>
  );
};

export default PlayerCard;

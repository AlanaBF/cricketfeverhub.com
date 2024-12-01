import React from "react";
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
        alt="Player"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/public/CricketImage.jpeg"; // Fallback image
        }}
      />
      <Card.Body className="playerCardBody">
        <Card.Title className="playerCardTitle">Player Name: {name}</Card.Title>
        <Card.Text className="playerCardText">Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button className="playerCardButton" variant="primary">
        Go somewhere
      </Button>
    </Card>
  );
};

export default PlayerCard;
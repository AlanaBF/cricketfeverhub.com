import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import getPlayerImages from "../../utils/getImage_API";
import '../../assets/styles/components.css'

function PlayerCard({ id,  name, teamName, faceImageId }) {
 
const imageURL = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${faceImageId}/i.jpg?p=de`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlayerImages(faceImageId);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [faceImageId]);

  return (
    <Card key={id} className="playerCard">
      <Card.Img className="playerCardImage" variant="top" src={imageURL} alt="Player" />
      <Card.Body className="playerCardBody">
        <Card.Title className="playerCardTitle">Player Name: {name}</Card.Title>
        <Card.Text className="playerCardText">Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button className="playerCardButton" variant="primary">Go somewhere</Button>
    </Card>
  );
}

export default PlayerCard;


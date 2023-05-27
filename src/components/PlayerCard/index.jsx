import { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import getPlayerImages from "../../utils/getImage_API";
import PropTypes from "prop-types";

function PlayerCard({ id,  name, teamName, faceImageId }) {
  console.log(faceImageId);
  //const [playerImage, setPlayerImage] = useState(null);
const imageURL = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${faceImageId}/i.jpg`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlayerImages(faceImageId);
        //setPlayerImage(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [faceImageId]);

  return (
    <Card key={id} style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageURL} alt="Player" />
      <Card.Body>
        <Card.Title>Player Name: {name}</Card.Title>
        <Card.Text>Team Name: {teamName}</Card.Text>
      </Card.Body>
      <Button variant="primary">Go somewhere</Button>
    </Card>
  );
}

PlayerCard.propTypes = {
  id: PropTypes.string.isRequired,
  faceImageId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
};

export default PlayerCard;


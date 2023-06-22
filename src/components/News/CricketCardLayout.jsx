import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import getImages from "../../utils/getImage_API";
import Card from "react-bootstrap/Card";
import "../../assets/styles/components.css";

const CricketCardLayout = () => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsData();
        if (newsData && newsData.storyList && newsData.storyList.length > 0) {
          const firstArticle = newsData.storyList[0].story;
          setArticle(firstArticle);
        }
      } catch (error) {
        console.error("Error fetching cricket news data:", error);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const fetchImage = async (imageId) => {
    try {
      const imageData = await getImages(imageId);
      console.log(imageData);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleCardClick = (imageId) => {
    fetchImage(imageId);
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const { id, hline, intro, source, pubTime, imageId } = article;
  const imageUrl = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/c${imageId}/i.jpg?p=de`;

  return (
    <div className="news-card-layout">
      <Card key={id} className="news-card" onClick={() => handleCardClick(imageId)}>
        <Card.Img variant="top" src={imageUrl} alt={hline} className="news-card-image" />
        <Card.Body>
          <Card.Title>{hline}</Card.Title>
          <Card.Text>{intro}</Card.Text>
          <Card.Text>{source}</Card.Text>
          <Card.Text>{formatTimestamp(pubTime)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CricketCardLayout;


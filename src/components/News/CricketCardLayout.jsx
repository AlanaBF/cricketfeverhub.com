import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import Card from "react-bootstrap/Card";
import "../../assets/styles/components.css";

const CricketCardLayout = ({ imageId }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsData();
        const top5Stories = newsData.storyList.slice(0, 6); // Extract the top 5 stories
        setNews(top5Stories);
      } catch (error) {
        console.error("Error fetching cricket news data:", error);
      }
    };

    fetchData();
  }, [imageId]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString(); // Adjust the format as per your requirements
  };

  return (
    <div className="news-card-layout">
      {news.map((item) => {
        if (item.story) {
          const { id, hline, intro, source, pubTime, imageCaption } = item.story;
          const imageUrl = item.story.coverImage.id
            ? `https://cricbuzz-cricket.p.rapidapi.com/img/v1/c${item.story.coverImage.id}/i.jpg?p=de`
            : null;

          return (
            <Card key={id} className="news-card">
              {imageUrl && (
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={hline}
                  className="news-card-image"
                />
              )}
              <Card.Body>
                <Card.Title>{hline}</Card.Title>
                <Card.Text>{intro}</Card.Text>
                <Card.Text>Source: {source}</Card.Text>
                <Card.Text>
                  Publication Time: {formatTimestamp(pubTime)}
                </Card.Text>
                {imageCaption && <Card.Text>Image Caption: {imageCaption}</Card.Text>}
              </Card.Body>
            </Card>
          );
        } else {
          return null; // Ignore items without story object
        }
      })}
      </div>
  );
};

export default CricketCardLayout;


import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import getImages from "../../utils/getImage_API";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../assets/styles/components.css";

const CricketCardLayout = ({ imageId }) => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsData();
        setNews(newsData.storyList);
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

  const handleShowModal = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setShowModal(false);
  };

  return (
    <div className="card-layout">
      {news.map((item) => {
        if (item.story) {
          const { id, hline, intro, source, pubTime, imageCaption } = item.story;
          const imageUrl = item.story.imageId
            ? `https://cricbuzz-cricket.p.rapidapi.com/img/v1/c${item.story.imageId}/i.jpg?p=de`
            : null;

          return (
            <Card key={id} className="card">
              {imageUrl && (
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={hline}
                  className="card-image"
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
                <Button onClick={() => handleShowModal(item)}>
                  Read Full Article
                </Button>
              </Card.Body>
            </Card>
          );
        } else {
          return null; // Ignore items without story object
        }
      })}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Full Article</Modal.Title>
        </Modal.Header>
      {selectedArticle && selectedArticle.story && (
  <Modal.Body>
    <>
      <h3>{selectedArticle.story.hline}</h3>
      <p>{selectedArticle.story.intro}</p>
      {selectedArticle.story.content &&
        selectedArticle.story.content.map((contentItem, index) => {
          if (contentItem.content.contentType === "text") {
            return <p key={index}>{contentItem.content.contentValue}</p>;
          } else if (contentItem.content.contentType === "image") {
            return (
              <img
                key={index}
                src={contentItem.content.contentValue}
                alt=""
                className="article-image"
              />
            );
          } else {
            return null;
          }
        })}
    </>
  </Modal.Body>
)}


        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CricketCardLayout;

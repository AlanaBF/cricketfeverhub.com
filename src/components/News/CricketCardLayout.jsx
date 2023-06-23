import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../assets/styles/components.css";
import axios from "axios";

const CricketCardLayout = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [articleContent, setArticleContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await getNewsData();
        const topStories = newsData.storyList.slice(0, 11); // Extract the top 5 stories
        setNews(topStories);
      } catch (error) {
        console.error("Error fetching cricket news data:", error);
      }
    };

    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString(); // Adjust the format as per your requirements
  };

  const handleOpenModal = async (article) => {
    setSelectedArticle(article);
    setShowModal(true);

    const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;
    try {
      const response = await axios.get(
        `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${article.id}`,
        {
          headers: {
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            "x-rapidapi-key": VITE_RapidAPI_Key,
          },
        }
      );
      const data = response.data;
      console.log("Article content data:", data); // Check the data structure

      setArticleContent(data.content);
    } catch (error) {
      console.error("Error fetching article content:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setArticleContent("");
  };

  return (
    <div className="news-card-layout">
      {news.map((item) => {
        if (item && item.story) {
          const { id, hline, intro, source, pubTime } = item.story;

          return (
            <Card key={id} className="card">
              <Card.Body>
                <Card.Title>{hline}</Card.Title>
                <Card.Text>{intro}</Card.Text>
                <Card.Text>Source: {source}</Card.Text>
                <Card.Text>
                  Publication Time: {formatTimestamp(pubTime)}
                </Card.Text>
                <Button onClick={() => handleOpenModal(item.story)}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          );
        } else {
          return null; // Ignore items without story object
        }
      })}

      {selectedArticle && (
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedArticle.headline}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {articleContent && articleContent.length > 0 ? (
        articleContent.map((item, index) => (
          <p key={index}>
            {item.content &&
              item.content.contentValue &&
              item.content.contentValue}
          </p>
        ))
      ) : (
        <p>No article content available.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}



    </div>
  );
};

export default CricketCardLayout;

import { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import getCricbuzzImageUrl from "../../utils/getCricbuzzImageUrl";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";
import axios from "axios";
import "../../assets/styles/pages.css";
import CricketImage from "../../assets/CricketImage.jpeg";

const CricketCardLayout = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newsData = await getNewsData();
      const topStories = newsData.storyList.slice(0, 8);
      setNews(topStories);
    } catch (fetchError) {
      console.error("Error fetching cricket news data:", fetchError);
      setError("Unable to load cricket news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const handleOpenModal = async (article) => {
    setSelectedArticle(article);
    setShowModal(true);

    const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key4;
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

      const formattedContent = data.content.map((contentBlock) => {
        if (
          contentBlock.content &&
          contentBlock.content.contentType === "text" &&
          contentBlock.content.hasFormat
        ) {
          contentBlock.content.contentValue = contentBlock.content.contentValue
            .replace(/@B\d+\$/g, "")
            .replace(/@I\d+\$/g, "")
            .replace(/@L\d+\$/g, "");
        }
        return contentBlock;
      });

      setArticleContent(formattedContent);
    } catch (fetchError) {
      console.error("Error fetching article content:", fetchError);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setArticleContent("");
    setSelectedArticle(null);
  };

  if (isLoading) {
    return <LoadingSpinner message="Fetching latest cricket news..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchNewsData} />;
  }

  return (
    <div>
      <div className="image-container">
        <img className="cricket-image" src={CricketImage} alt="" />
        <h2 className="heading">Cricket in the News</h2>
        <img className="cricket-image" src={CricketImage} alt="" />
      </div>
      <div className="news-card-layout">
        {news.map((newsItem) => {
          if (newsItem && newsItem.story) {
            const { id, hline, intro, source, pubTime } = newsItem.story;

            return (
              <Card key={id} className="news-card" as="article">
                <Card.Body>
                  <Card.Title>{hline}</Card.Title>
                  <Card.Text>{intro}</Card.Text>
                  <Card.Text>Source: {source}</Card.Text>
                  <Card.Text>
                    Publication Time: {formatTimestamp(pubTime)}
                  </Card.Text>
                  <Button
                    className="news-modal-readmore"
                    onClick={() => handleOpenModal(newsItem.story)}
                    aria-label={`Read more about: ${hline}`}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            );
          } else {
            return null;
          }
        })}

        {selectedArticle && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            aria-labelledby="news-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="news-modal-title" className="news-modal-text">
                {selectedArticle.hline}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedArticle.coverImage && (
                <Card.Img
                  variant="top"
                  src={getCricbuzzImageUrl(selectedArticle.coverImage.id)}
                  alt={`Cover image for ${selectedArticle.hline}`}
                />
              )}
              {articleContent && articleContent.length > 0 ? (
                articleContent.map((contentBlock, contentIndex) => (
                  <p className="news-modal-text" key={contentIndex}>
                    {contentBlock.content &&
                      contentBlock.content.contentValue &&
                      contentBlock.content.contentValue}
                  </p>
                ))
              ) : (
                <p className="news-modal-text">Loading article content...</p>
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
    </div>
  );
};

export default CricketCardLayout;

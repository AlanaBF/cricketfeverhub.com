import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API.";
import "../../assets/styles/components.css";
import { Carousel, Button, Spinner } from "react-bootstrap";

function CricketNewsComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    try {
      const response = await getNewsData();
      console.log("Response:", response);
      if (!response || !response.storyList) {
        console.log("Invalid response data:", response);
        throw new Error("Invalid response data");
      }
      setNews(response.storyList);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const renderCarouselItems = news.map((article, index) => (
    <Carousel.Item key={`${article.id}-${index}`}>
      <div className="new">
        {article.coverImage && article.coverImage.source && (
          <img src={article.coverImage.source} alt={article.seoHeadline} />
        )}
        <div className="new-content">
          <h3>{article.hline}</h3>
          <p>{article.intro}</p>
          <a href={article.source} target="_blank" rel="noreferrer">
            <Button>Read more</Button>
          </a>
        </div>
      </div>
    </Carousel.Item>
  ));

  return (
   
    <div className="news-section">
      <div className="carousel">
        <Carousel>
          {loading ? (
            <Carousel.Item>
              <div className="new">
                <Spinner animation="grow" variant="light" />
              </div>
            </Carousel.Item>
          ) : error ? (
            <Carousel.Item>
              <div className="new">
                <h3>{error}</h3>
              </div>
            </Carousel.Item>
          ) : (
            renderCarouselItems
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default CricketNewsComponent;

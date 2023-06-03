import React, { useEffect, useState } from "react";
import axios from 'axios';
import getNewsData from '../../utils/getNews_API.';
import Carousel from 'react-bootstrap/Carousel';
import '../../assets/styles/components.css';

const CricketNewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const data = await getNewsData();
        const newsData = data.storyList.filter(item => item.story);
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching cricket news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  const getImageUrl = (imageId) => {
    return `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${imageId}/i.jpg`;
  };

  return (
    <div>
      <Carousel>
        {news.map((item) => (
          <Carousel.Item key={item.story.id}>
            <img
              className="d-block w-100"
              src={getImageUrl(item.story.imageid)}
              alt={item.story.hline}
            />
            <Carousel.Caption>
              <h3>{item.story.hline}</h3>
              <p>{item.story.intro}</p>
              <p>Source: {item.story.source}</p>
              <p>Publication Time: {item.story.pubTime}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CricketNewsComponent;

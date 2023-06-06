import React, { useEffect, useState } from "react";
import getNewsData from '../../utils/getNews_API';
import Carousel from 'react-bootstrap/Carousel';
import '../../assets/styles/components.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CricketCarousel = ({ imageId }) => {
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

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString(); // Adjust the format as per your requirements
  };

  return (
    <Carousel className="carousel">
      {news.map((item, index) => {
        const imageUrl = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/c${imageId}/i.jpg`;
        const imageCaption = item.story.imageId?.caption || '';

        return (
          <Carousel.Item key={item.story.id}>
            <img className="NewImage d-block w-100" variant="top" src={imageUrl} alt={item.story.hline}/>
            <Carousel.Caption>
              <h3>{item.story.hline}</h3>
              <p>{item.story.intro}</p>
              <p>Source: {item.story.source}</p>
              <p>Publication Time: {formatTimestamp(item.story.pubTime)}</p>
              <p>Image Caption: {imageCaption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CricketCarousel;

import React, { useEffect, useState } from "react";
import getNewsData from "../../utils/getNews_API";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../assets/styles/components.css";
import axios from "axios";
import getImages from '../../utils/getImage_API.jsx';

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

  useEffect(() => {
    const fetchCoverImage = async () => {
      try {
        const data = await getImages(selectedArticle.coverImage.id);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (selectedArticle) {
      fetchCoverImage();
    }
  }, [selectedArticle]);

  const handleOpenModal = async (item) => {
    setSelectedArticle(item);
    setShowModal(true);

    const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;
    try {
      const response = await axios.get(
        `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${item.id}`,
        {
          headers: {
            "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
            "x-rapidapi-key": VITE_RapidAPI_Key,
          },
        }
      );
      const data = response.data;

      setArticleContent(data.content);
    } catch (error) {
      console.error("Error fetching article content:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setArticleContent("");
    setSelectedArticle(null);
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
          return null; // Ignore items without a story object
        }
      })}

      {selectedArticle && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedArticle.hline}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedArticle.coverImage && (
              <Card.Img
                variant="top"
                src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${selectedArticle.coverImage.id}/i.jpg?p=de`}
                alt="Cover Image"
              />
            )}
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


// import React, { useEffect, useState } from "react";
// import getNewsData from "../../utils/getNews_API";
// import Card from "react-bootstrap/Card";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import "../../assets/styles/components.css";
// import axios from "axios";
// import getImages from "../../utils/getImage_API";
// import NewsArticle from "./NewsArticle"; // Import the NewsArticle component

// const CricketCardLayout = () => {
//   const [news, setNews] = useState([]);
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [articleContent, setArticleContent] = useState("");
//   const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const newsData = await getNewsData();
//         const topStories = newsData.storyList.slice(0, 11);
//         setNews(topStories);
//       } catch (error) {
//         console.error("Error fetching cricket news data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleString();
//   };

//   const handleOpenModal = async (item) => {
//     setSelectedArticle(item);
//     setShowModal(true);

//     const VITE_RapidAPI_Key = import.meta.env.VITE_RapidAPI_Key;
//     try {
//       const response = await axios.get(
//         `https://cricbuzz-cricket.p.rapidapi.com/news/v1/detail/${item.id}`,
//         {
//           headers: {
//             "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//             "x-rapidapi-key": VITE_RapidAPI_Key,
//           },
//         }
//       );
//       const data = response.data;
//       console.log("data.content:", data.content); // Add this line

//       setArticleContent(data.content);

//       if (item.coverImage && item.coverImage.id) {
//         try {
//           const imageData = await getImages(item.coverImage.id);
//           setImageURL(imageData.url);
//         } catch (error) {
//           console.error("Error fetching image:", error);
//           setImageURL("");
//         }
//       } else {
//         setImageURL("");
//       }
//     } catch (error) {
//       console.error("Error fetching article content:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setArticleContent("");
//     setImageURL("");
//     setSelectedArticle(null);
//   };

//   return (
//     <div className="news-card-layout">
//       {news.map((item) => {
//         if (item && item.story) {
//           const { id, hline, intro, source, pubTime } = item.story;

//           return (
//             <Card key={id} className="card">
//               <Card.Body>
//                 <Card.Title>{hline}</Card.Title>
//                 <Card.Text>{intro}</Card.Text>
//                 <Card.Text>Source: {source}</Card.Text>
//                 <Card.Text>
//                   Publication Time: {formatTimestamp(pubTime)}
//                 </Card.Text>
//                 <Button onClick={() => handleOpenModal(item.story)}>
//                   Read More
//                 </Button>
//               </Card.Body>
//             </Card>
//           );
//         } else {
//           return null;
//         }
//       })}

//       {selectedArticle && (
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedArticle.headline}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <NewsArticle articleContent={articleContent} />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default CricketCardLayout;

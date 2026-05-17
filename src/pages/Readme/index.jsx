import ReactMarkdown from 'react-markdown';
import CricketHero from "../../assets/Cricketbanner.jpeg";
import './ReadmePage.css';
import Cricketbanner from "../../assets/Cricketbanner.png";

const readmeContent = `
# Cricket Fever Hub

An app for users to share their love of cricket

## Website under construction

![Cricket Fever Hub](./public/apple-touch-icon.png)

[cricketfeverhub.com](http://www.cricketfeverhub.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

CricketFeverHub is a comprehensive cricket app that provides live match updates, upcoming matches, cricket news, weather forecasts, detailed scorecards, interactive maps, and match commentary. It leverages the RapidAPI Cricbuzz Cricket API and is built using Vite and React, deployed on Vercel. The app is released under the MIT license.

## Technologies

- ![HTML Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Installation

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:

   \`\`\`sh
   git clone https://github.com/AlanaBF/cricketfeverhub.com.git
   \`\`\`

2. Navigate to the project directory:

    \`\`\`sh
    cd cricketfeverhub
    \`\`\`

3. Install dependencies:

    \`\`\`sh
    npm install
    \`\`\`

4. Create a .env file in the root directory and add your API keys:

    \`\`\`env
    VITE_RapidAPI_Key=your_rapidapi_key
    VITE_RapidAPI_Key_Weather=your_openweatherapi_key
    \`\`\`

### Usage

#### Development

To start the development server:

\`\`\`sh
npm run dev
\`\`\`

#### Build

To build the app for production:

\`\`\`sh
npm run build
\`\`\`

#### Deployment

To deploy the app to Vercel:

- Push your code to a Git repository.
- Link the repository to Vercel.
- Set up environment variables in the Vercel dashboard.

## Dependencies

- \`@vercel/analytics\`: Vercel Analytics for performance tracking.
- \`axios\`: For making API calls.
- \`bootstrap\`: For responsive design.
- \`leaflet\`: For interactive maps.
- \`react\`: React library for building the user interface.
- \`react-bootstrap\`: Bootstrap components for React.
- \`react-dom\`: React library for DOM manipulations.
- \`react-leaflet\`: React components for Leaflet maps.
- \`react-router-bootstrap\`: Integration of React Router with React-Bootstrap.
- \`react-router-dom\`: For client-side routing.

## API Integration

### RapidAPI Cricbuzz Cricket API

- Website: [https://rapidapi.com/cricketapilive/api/cricbuzz-cricket](https://rapidapi.com/cricketapilive/api/cricbuzz-cricket)
- Authentication: Requires an API key from RapidAPI.

### Open Weather Map

- Website: [https://openweathermap.org/](https://openweathermap.org/)
- Authentication: Requires an API key from openweathermap.

## Project Structure

\`\`\`plaintext
cricketfeverhub/
├── public/
│   ├── banner.jpeg
│   └── apple-touch-icon.png
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md
\`\`\`

## Features

- Live Matches: Real-time updates of ongoing matches.
- Upcoming Matches: Schedule of upcoming matches.
- Cricket News: Latest news in the cricket world.
- Weather Integration: Weather forecasts for match locations.
- Scorecards: Detailed scorecards for matches.
- Maps: Interactive maps showing match locations.
- Match Commentary: Live commentary of matches.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- RapidAPI Cricbuzz Cricket API
- React
- Vite
- Vercel
- Open Weather Map API

## Contact Information

Thank you for visiting my Cricket Site. I look forward to hearing from you. If you have any questions or need further assistance, please contact me:

- Email: [alanabarrettfrew@gmail.com](mailto:alanabarrett-frew@hotmail.com)
- Website: [www.alanabarrettfrew.com](https://www.alanabarrettfrew.com)
- Github: [AlanaBF](https://github.com/AlanaBF)`;

const ReadmePage = () => {
  return (
    <div className="pageBackground readmePage">
      <img className="hero-image" src={CricketHero} alt="Cricket players in action" />
      <div className="readme-content">
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      </div>
      <img className="hero-image" src={Cricketbanner} alt="Cricket Fever Hub banner" />
    </div>
  );
};

export default ReadmePage;

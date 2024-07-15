import React from 'react';
import ReactMarkdown from 'react-markdown';
import CricketHero from "../../assets/Cricketbanner.jpeg";
import './ReadmePage.css'; // Import the CSS file
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
- \`axios-rate-limit\`: To handle rate limiting in API requests.
- \`bootstrap\`: For responsive design.
- \`dotenv\`: For managing environment variables.
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
│   └── index.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md
\`\`\`

## Features

- **Live Matches**: Real-time updates of ongoing matches.
- **Upcoming Matches**: Schedule of upcoming matches.
- **Cricket News**: Latest news in the cricket world.
- **Weather Integration**: Weather forecasts for match locations.
- **Scorecards**: Detailed scorecards for matches.
- **Maps**: Interactive maps showing match locations.
- **Match Commentary**: Live commentary of matches.

## To Do

1. Home Page

   - [ ] Display International Matches:
     - [ ] List of matches for the current week.
     - [ ] Information to include: Day, Date, Time, Match Details (Teams, Venue), Weather forecast.
     - [ ] Data source integration for live match schedules and weather updates.
     - [ ] Add weather and map integration

2. For Fun Page

   - [ ] Podcasts:
     - [ ] Embed or link to popular cricket podcasts.
     - [ ] Regularly update with new episodes.
   - [ ] Additional Interest Links:
     - [ ] Links to other cricket-related apps.
     - [ ] Links to England Cricket, ECB, The Hundred.
     - [ ] Ensure all links are regularly checked and updated.

3. Map Integration

   - [x] Weather Information:
     - [x] Integrate weather information into all maps.
     - [x] Ensure real-time updates and accuracy.
     - [x] Test for different locations and conditions.
     - [ ] Add weather map to upcoming fixtures
     - [ ] Add weather map and forecast with search to Homepage

4. Scorecard and Commentary

   - [ ] Scorecard and Commentary Buttons:
     - [ ] Ensure Scorecard and Commentary sections are accessible from each other.
     - [ ] Add a toggle button to switch between Scorecard and Commentary within the same section.
     - [ ] Ensure seamless transition and minimal load times.

5. General Tasks

   - [ ] User Interface Design:
     - [ ] Ensure the design is user-friendly and intuitive.
     - [ ] Consistent theme and branding across all pages.
     - [ ] Regularly update design elements based on user feedback.

6. Performance Optimization

   - [ ] Ensure fast loading times for all pages.
   - [ ] Optimize images and other media for quick load times.
   - [ ] Regularly monitor and improve app performance.

7. Testing and Bug Fixes

   - [ ] Conduct thorough testing for all new features.
   - [ ] Regularly check for and fix bugs.
   - [ ] User testing sessions to gather feedback and make improvements.

8. Regular Updates

   - [ ] Plan for regular updates and new features.
   - [ ] Keep the content fresh and engaging.
   - [ ] Monitor trends and user preferences to keep the app relevant.

9. Optional Enhancements

   - [ ] User Profiles:
     - [ ] Allow users to create profiles to save preferences.
     - [ ] Personalized match notifications and updates.

10. Social Media Integration

    - [ ] Integrate social media sharing options.
    - [ ] Allow users to share match updates and scores on their social profiles.

11. Push Notifications

    - [ ] Implement push notifications for match updates, scores, and weather alerts.

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
      <img className="hero-image" src={CricketHero} alt="Cricket Hero" />
      <div className="readme-content">
        <ReactMarkdown>{readmeContent}</ReactMarkdown>
      </div>
      <img className="hero-image" src={Cricketbanner}></img>
    </div>
  );
};

export default ReadmePage;

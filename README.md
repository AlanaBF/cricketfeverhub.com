# Cricket Fever Hub

A modern React application for cricket fans, providing live scores, match commentary, player profiles, ICC rankings, and the latest cricket news.

![Cricket Fever Hub](./public/apple-touch-icon.png)

[cricketfeverhub.com](http://www.cricketfeverhub.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Live Matches** - Real-time updates with series filtering (including Women's Cricket)
- **Upcoming Matches** - Schedule of fixtures with venue maps and weather forecasts
- **ICC Rankings** - Test, ODI, and T20I rankings for batsmen, bowlers, and all-rounders with team filtering
- **Player Profiles** - Detailed career stats, batting and bowling records across formats
- **Trending Players** - See who's making headlines right now
- **Cricket News** - Latest stories with full article detail modals
- **Scorecards** - Ball-by-ball scoring data with batsmen, bowlers, partnerships, and extras
- **Match Commentary** - Live ball-by-ball commentary with match summary
- **Weather Integration** - Forecasts for match venues with interactive maps
- **Discover** - Curated links to ECB, BBC Cricket, podcasts, and more

## Tech Stack

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) React 18
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) Vite 8
- ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) Bootstrap 5 + React Bootstrap
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```sh
git clone https://github.com/AlanaBF/cricketfeverhub.com.git
cd cricketfeverhub.com
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_RapidAPI_Key1=your_rapidapi_key
VITE_RapidAPI_Key2=your_rapidapi_key
VITE_RapidAPI_Key3=your_rapidapi_key
VITE_RapidAPI_Key4=your_rapidapi_key
VITE_RapidAPI_Key5=your_rapidapi_key
VITE_RapidAPI_Key_Weather=your_openweathermap_key
```

Multiple RapidAPI keys are used to distribute requests across rate limits.

### Development

```sh
npm run dev
```

### Production Build

```sh
npm run build
```

### Deployment

Deployed on Vercel. Push to the repository and Vercel builds automatically. Environment variables are configured in the Vercel dashboard.

## Project Structure

```
cricketfeverhub.com/
├── public/                  Static assets
├── src/
│   ├── assets/             Images and CSS
│   │   └── styles/         Global stylesheets
│   ├── components/         Reusable UI components
│   │   ├── Commentary/     Match commentary display
│   │   ├── ErrorState/     Error UI with retry
│   │   ├── Footer/         Site footer
│   │   ├── Header/         Navigation bar
│   │   ├── LiveMatches/    Live match list with filters
│   │   ├── LoadingSpinner/ Loading indicator
│   │   ├── MatchMap/       Venue map with weather
│   │   ├── News/           News cards and modal
│   │   ├── PlayerData/     Player search
│   │   ├── PlayerProfile/  Full player stats page
│   │   ├── Podcast/        Discover page content
│   │   ├── Rankings/       ICC rankings with filters
│   │   ├── Scorecard/      Match scorecard components
│   │   ├── TrendingPlayers/ Trending widget
│   │   └── UpComingMatches/ Upcoming fixtures
│   ├── pages/              Route-level page components
│   ├── utils/              API service functions
│   ├── App.jsx             Router configuration
│   └── main.jsx            Entry point
├── .env                    Environment variables (not committed)
├── vite.config.js          Vite configuration with dev proxy
├── package.json
└── README.md
```

## API Integration

### Cricbuzz Cricket API (via RapidAPI)

Provides live matches, scorecards, commentary, player data, rankings, and news.

- [RapidAPI Cricbuzz](https://rapidapi.com/cricketapilive/api/cricbuzz-cricket)

### OpenWeatherMap API

Provides weather forecasts and precipitation maps for match venues.

- [OpenWeatherMap](https://openweathermap.org/)

## Accessibility

- Semantic HTML (`main`, `nav`, `section`, `article`)
- ARIA labels on all interactive elements
- Keyboard navigation support on clickable elements
- Alt text on all images
- Loading and error states for screen readers

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## Contact

- Website: [alanabarrettfrew.com](https://www.alanabarrettfrew.com)
- GitHub: [AlanaBF](https://github.com/AlanaBF)
- LinkedIn: [alanabarrettfrew](https://www.linkedin.com/in/alanabarrettfrew/)

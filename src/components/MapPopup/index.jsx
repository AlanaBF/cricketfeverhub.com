import { findCurrentMatch } from "./helpers";

const MapPopup = ({ matchId, venueInfo }) => {
  const [venueDetails, setVenueDetails] = useState(venueInfo);

  useEffect(() => {
    if (!venueDetails) {
      const fetchData = async () => {
        try {
          const data = await getLiveMatchesData();
          const matchesData = data?.typeMatches.flatMap((typeMatch) =>
            typeMatch.seriesMatches.filter(
              (seriesMatch) => seriesMatch.seriesAdWrapper
            )
          );

          const currentMatch = findCurrentMatch(matchId, matchesData);
          setVenueDetails(currentMatch.venueInfo);
        } catch (error) {
          console.error("Error fetching live matches data:", error);
        }
      };

      fetchData();
    }
  }, []);

  console.log(venueDetails, 'HOHOHOHO')
  return <div>MapPopup</div>;
};

export default MapPopup;

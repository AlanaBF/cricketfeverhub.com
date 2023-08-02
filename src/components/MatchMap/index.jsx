import { useEffect, useState } from "react";
import { findCurrentMatch } from "./helpers";
import Map from "../../utils/Leaflet/Leaflet_API";
import getLiveMatchesData from "../../utils/getLiveMatches_API";

const MatchMap = ({ matchId, venueInfo }) => {
  // State to hold venue details
  const [venueDetails, setVenueDetails] = useState(venueInfo);

  useEffect(() => {
    // Check if venueInfo is not available, then fetch and set venue details
    if (!venueDetails) {
      const fetchData = async () => {
        try {
          // Fetch live match data
          const data = await getLiveMatchesData();

          // Extract series matches data
          const matchesData = data?.typeMatches.flatMap((typeMatch) =>
            typeMatch.seriesMatches.filter(
              (seriesMatch) => seriesMatch.seriesAdWrapper
            )
          );

          // Find the current match based on matchId
          const currentMatch = findCurrentMatch(matchId, matchesData);

          // Update state with the venue information of the current match
          setVenueDetails(currentMatch?.matchInfo?.venueInfo);
        } catch (error) {
          console.error("Error fetching live matches data:", error);
        }
      };

      // Fetch data when venueDetails is not available from props
      //(For example, page was opened by clicking on shared link and venueDetails were not passed
      // as no click on button on previouse page)
      fetchData();
    }
  }, [matchId]); // Re-run the effect when matchId changes

  // Render the Map component with the venue details if available, otherwise display a message
  const renderMap = venueDetails ? (
    <div>
      <p style={{ color: "#fff" }}>
        Venue: {venueDetails.ground}, {venueDetails.city}
      </p>
      <Map venue={venueDetails} />
    </div>
  ) : (
    <div>No Map Available</div>
  );

  return renderMap;
};

export default MatchMap;

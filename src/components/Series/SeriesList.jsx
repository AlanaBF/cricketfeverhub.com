import { useEffect, useState } from "react";
import getSeriesList from "../../utils/getSeries_API";
import LoadingSpinner from "../LoadingSpinner";
import ErrorState from "../ErrorState";
import "../../assets/styles/components.css";

const SeriesList = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSeries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSeriesList();
      const allSeries = data.seriesMapProto || data.series || [];
      setSeriesData(allSeries);
    } catch (fetchError) {
      console.error("Error fetching series:", fetchError);
      setError("Unable to load series. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(parseInt(timestamp)).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  if (isLoading) return <LoadingSpinner message="Loading series..." />;
  if (error) return <ErrorState message={error} onRetry={fetchSeries} />;

  return (
    <div className="series-list-container">
      <h1 className="pageTitle">International Series</h1>
      <p className="pageDescription">Upcoming and ongoing international cricket series</p>
      {seriesData.map((group, groupIndex) => (
        <div key={groupIndex} className="series-group">
          {group.date && <h2 className="series-group-date">{group.date}</h2>}
          <div className="series-card-grid">
            {(group.series || []).map((series) => (
              <a
                key={series.id}
                href={`https://www.cricbuzz.com/cricket-series/${series.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="series-card"
                aria-label={`View ${series.name} on Cricbuzz`}
              >
                <h3 className="series-card-title">{series.name}</h3>
                <p className="series-card-dates">
                  {formatDate(series.startDt)} - {formatDate(series.endDt)}
                </p>
                <span className="series-card-link-hint">View on Cricbuzz</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeriesList;

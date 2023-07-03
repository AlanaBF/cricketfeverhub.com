import React, { useEffect, useState } from "react";
import getImages from "../../utils/getImage_API";

const CountryList = ({ countries, selectedCountryId, handleCountryClick }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const fetchCountryImage = async () => {
      try {
        setIsLoadingImage(true);
        const data = await getImages(selectedCountryId.imageId);
        setCoverImage(data);
        setIsLoadingImage(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoadingImage(false);
      }
    };

    if (selectedCountryId) {
      fetchCountryImage();
    }
  }, [selectedCountryId]);

  return (
    <div>
      <h2>Select a country</h2>
      <div className="country-cards">
        {countries.map((country, index) => (
          <div
            key={`country-${index}`}
            className={`country-card ${selectedCountryId === country.teamId ? "selected" : ""}`}
            onClick={() => handleCountryClick(country)}
          >
            {selectedCountryId && country.imageId && (
              <>
                {isLoadingImage ? (
                  <p>Loading image...</p>
                ) : (
                  <img
                    variant="top"
                    src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${country.imageId}/i.jpg?p=de`}
                    alt="Country Image"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;

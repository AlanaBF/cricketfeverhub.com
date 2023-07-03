import React from 'react'

function TeamSchedule() {
  return (
    <div>
         {/* Display schedules */}
      {schedules && schedules.length > 0 ? (
        <div>
          <h2>Schedules for {selectedCountryId}</h2>
          <ul>
            {schedules.map((schedule, index) => (
              <li key={index}>{schedule}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No schedules available</div>
      )}
    </div>
  )
}

export default TeamSchedule
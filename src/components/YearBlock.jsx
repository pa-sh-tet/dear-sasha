import React from "react";

const YearBlock = ({ year, age, description, photo, delay }) => {
  return (
    <div
      className="year-block"
      style={{
        animation: `fadeIn 0.5s ease-in-out ${delay}s both`,
      }}
    >
      <div className="year-header">
        <h2>
          {year} – {age} {age === 1 ? "год" : age < 5 ? "года" : "лет"}
        </h2>
      </div>
      <div className="year-content">
        <div className="photo-container">
          <img src={photo} alt={`${year} год`} className="retro-photo" />
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default YearBlock;

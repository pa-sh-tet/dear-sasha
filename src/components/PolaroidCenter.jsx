import React from "react";

const PolaroidCenter = ({ year, age, description, photo, delay }) => {
  return (
    <div
      className="polaroid-block center"
      style={{ animation: `fadeIn 0.5s ease-in-out ${delay}s both` }}
    >
      <div className="polaroid-photo-container">
        <div className="polaroid-frame">
          <img
            src={`${photo}`}
            alt={`${year} год`}
            className="polaroid-image"
          />
          <div className="polaroid-caption">
            {age} {getAgeText(age)}
          </div>
        </div>
      </div>
      <div className="polaroid-description">
        <h3>{year}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

// Функция для склонения "год/года/лет"
const getAgeText = (age) => {
  if (age === "3 недели" || age === "1 месяц" || age === "9 месяцев") return "";
  if (age === 1) return "год";
  if (age >= 2 && age <= 4) return "года";
  return "лет";
};

export default PolaroidCenter;

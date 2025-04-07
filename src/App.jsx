// import React, { useState, useEffect } from "react";
// import YearBlock from "./components/YearBlock";
// import MusicPlayer from "./components/MusicPlayer";
// import { yearsData } from "./data";
// import "./styles/main.css";
// import "./styles/retro-effects.css";
// import back from "../src/images/0.9.jpg";

// function App() {
//   const [backgroundIndex, setBackgroundIndex] = useState(0);
//   const backgrounds = ["/images/0.9.jpg", "5.2.jpg", "5.2.jpg"];

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const newIndex = Math.min(
//         Math.floor(scrollY / (document.body.scrollHeight / backgrounds.length)),
//         backgrounds.length - 1
//       );
//       setBackgroundIndex(newIndex);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [backgrounds.length]);

//   return (
//     <div
//       className="app"
//       style={{
//         backgroundImage: `url(${back}))`,
//         // backgroundImage: `url(${backgrounds[backgroundIndex]})`,
//       }}
//     >
//       <header className="retro-header">
//         <h1>30 лет удивительной истории</h1>
//         <p>Прокрути вниз, чтобы увидеть путешествие</p>
//       </header>

//       <div className="timeline">
//         {yearsData.map((year, index) => (
//           <YearBlock
//             key={year.year}
//             year={year.year}
//             age={year.age}
//             description={year.description}
//             photo={year.photo}
//             delay={index * 0.1}
//           />
//         ))}
//       </div>

//       <div className="final-slide">
//         <img
//           src="/images/final-photo.jpg"
//           alt="30 лет"
//           className="retro-photo-final"
//         />
//         <div className="final-message">
//           <h2>30 лет — и это только начало…</h2>
//           <p>С любовью, [Ваше имя]</p>
//         </div>
//       </div>

//       <MusicPlayer />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import PolaroidLeft from "./components/PolaroidLeft";
import PolaroidRight from "./components/PolaroidRight";
import PolaroidCenter from "./components/PolaroidCenter";
import MusicPlayer from "./components/MusicPlayer";
import { yearsData } from "./data";
import "./styles/main.css";
import "./styles/polaroid.css";
import back from "../src/images/0.9.jpg";

function App() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    "background-1.jpg",
    "background-2.jpg",
    "background-3.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newIndex = Math.min(
        Math.floor(scrollY / (document.body.scrollHeight / backgrounds.length)),
        backgrounds.length - 1
      );
      setBackgroundIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="app"
      // style={{
      //   backgroundImage: `url(${back}))`,

      //   // backgroundImage: `url(${backgrounds[backgroundIndex]})`,
      // }}
    >
      <header className="retro-header">
        <h1>30 лет назад на свет появилась ты</h1>
        {/* <p>давай посмотрим на твою историю</p> */}
      </header>

      <div className="polaroid-timeline">
        {yearsData.map((year, index) => {
          // Чередуем компоненты для разнообразия
          const ComponentType =
            index % 3 === 0
              ? PolaroidLeft
              : index % 3 === 1
              ? PolaroidRight
              : PolaroidCenter;

          return (
            <ComponentType
              key={year.year}
              year={year.year}
              age={year.age}
              description={year.description}
              photo={year.photo}
              delay={index * 0.1}
            />
          );
        })}
      </div>

      <div className="final-slide">
        <div className="polaroid-frame center-final">
          <img
            src="/images/final-photo.jpg"
            alt="30 лет"
            className="polaroid-image"
          />
          <div className="polaroid-caption">
            30 лет — и это только начало...
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default App;

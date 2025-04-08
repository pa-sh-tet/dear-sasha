import React, { useState, useEffect, useRef } from "react";
import PolaroidLeft from "./components/PolaroidLeft";
import PolaroidRight from "./components/PolaroidRight";
import PolaroidCenter from "./components/PolaroidCenter";
import { yearsData } from "./data";
import "./styles/main.css";
import "./styles/polaroid.css";
import "./styles/fonts.css";

// Компонент для YouTube-видео
const YouTubeVideo = ({ videoId }) => (
  <div className="video-container">
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Встроенное видео"
    />
  </div>
);

function App() {
  // Конфигурация фонов и треков
  const backgrounds = [
    "/images/background-0-5.jpg",
    "/images/background-5-10.jpg",
    "/images/background-10-15.jpg",
    "/images/background-15-20.jpg",
    "/images/background-20-25.jpg",
    "/images/background-25-30.jpg",
  ];

  const tracks = [
    "/audio/section-0-5.mp3",
    "/audio/section-5-10.mp3",
    "/audio/section-10-15.mp3",
    "/audio/section-15-20.mp3",
    "/audio/section-20-25.mp3",
    "/audio/section-25-30.mp3",
  ];

  // Состояния для фона
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Состояния для аудио
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const fadeInterval = useRef(null);

  // Инициализация аудио
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearInterval(fadeInterval.current);
    };
  }, []);

  // Обработка скролла
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = document.body.scrollHeight / backgrounds.length;
      const newIndex = Math.min(
        Math.floor(scrollY / sectionHeight),
        backgrounds.length - 1
      );

      // Обработка фонов
      if (newIndex !== currentBgIndex && !isTransitioning) {
        setNextBgIndex(newIndex);
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentBgIndex(newIndex);
          setIsTransitioning(false);
        }, 1000);
      }

      // Обработка аудио
      if (audioEnabled && newIndex !== currentBgIndex) {
        changeAudioTrack(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentBgIndex, isTransitioning, audioEnabled]);

  // Плавная смена трека
  const changeAudioTrack = (newIndex) => {
    if (!audioRef.current) return;

    const fadeAudio = () => {
      const fadeOutInterval = setInterval(() => {
        if (audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.05;
        } else {
          audioRef.current.pause();
          clearInterval(fadeOutInterval);

          audioRef.current.src = tracks[newIndex];
          audioRef.current.currentTime = 0;
          audioRef.current
            .play()
            .then(() => {
              const fadeInInterval = setInterval(() => {
                if (audioRef.current.volume < 0.7) {
                  audioRef.current.volume += 0.05;
                } else {
                  clearInterval(fadeInInterval);
                }
              }, 100);
            })
            .catch((e) => console.log("Play error:", e));
        }
      }, 100);
      fadeInterval.current = fadeOutInterval;
    };

    fadeAudio();
  };

  // Включение аудио
  const enableAudio = () => {
    audioRef.current.src = tracks[currentBgIndex];
    audioRef.current.volume = 0.7;
    audioRef.current
      .play()
      .then(() => setAudioEnabled(true))
      .catch((e) => console.log("Audio play failed:", e));
  };

  return (
    <div
      className="app"
      style={{
        "--current-bg": `url(${backgrounds[currentBgIndex]})`,
        "--next-bg": `url(${backgrounds[nextBgIndex]})`,
      }}
    >
      {!audioEnabled && (
        <button className="enable-audio-btn" onClick={enableAudio}>
          🔈 Включить звук
        </button>
      )}

      <header className="retro-header">
        <h1>30 лет назад на свет появилась самая лучшая сестра</h1>
      </header>

      <div className="polaroid-timeline">
        {yearsData.map((year, index) => {
          // Вставляем видео после 3-го и 4-го компонентов
          const shouldInsertVideo = index === 2 || index === 8;
          const videoId = index === 2 ? "X-YRXVqLutc" : "S6aaKTopFwY";

          const ComponentType =
            index % 3 === 0
              ? PolaroidLeft
              : index % 3 === 1
              ? PolaroidRight
              : PolaroidCenter;

          return (
            <React.Fragment key={year.year}>
              <ComponentType
                year={year.year}
                age={year.age}
                description={year.description}
                photo={year.photo}
                delay={index * 0.1}
              />

              {shouldInsertVideo && (
                <div className="video-section">
                  <YouTubeVideo videoId={videoId} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="final-slide">
        <div className="polaroid-frame center-final">
          <img
            src="../images/30.jpg"
            alt="30 лет"
            className="polaroid-image "
          />
          <div className="polaroid-caption">
            30 лет — и это только начало...
          </div>
        </div>
      </div>

      <div className="audio-controls">
        <button onClick={() => audioRef.current?.pause()}>❚❚</button>
        <button onClick={() => audioRef.current?.play()}>►</button>
        {audioEnabled && (
          <button onClick={() => changeAudioTrack(currentBgIndex)}>🔄</button>
        )}
        {/* <span>
          Текущий период: {currentBgIndex * 5}-{(currentBgIndex + 1) * 5} лет
        </span> */}
      </div>
    </div>
  );
}

export default App;

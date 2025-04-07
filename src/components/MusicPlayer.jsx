import React, { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <button onClick={toggleMusic}>
        {isPlaying ? "🔊 Выключить музыку" : "🔇 Включить музыку"}
      </button>
      <audio id="bg-music" loop>
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;

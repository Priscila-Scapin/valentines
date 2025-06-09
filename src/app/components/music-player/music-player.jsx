import { useRef, useState, useEffect } from "react";
import "nes.css/css/nes.min.css";
import Image from "next/image";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  const tracks = ["/audio/hysteria-def-leppard.mp3", "/audio/is-this-love-whitesnake.mp3", "/audio/why-cant-this-be-love-van-hallen.mp3", "/audio/enjoy-the-silence.mp3", "/audio/animal-def-leppard.mp3", "/audio/where-are-you-going-dmb.mp3", "/audio/born-to-be-my-babe.mp3", "/audio/breathe-pink-floyd.mp3", "/audio/forever-kiss.mp3"];

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Playback prevented", err);
      });
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
  };

  // Toca a nova música automaticamente após troca de faixa
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Playback prevented", err);
      });
    }
  }, [currentTrackIndex]);

  // Toca a próxima música automaticamente quando uma termina
  const handleEnded = () => {
    handleNextTrack();
  };

  return (
    <div
      className='nes-container is-rounded'
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        width: "fit-content",
        padding: "2px",
      }}
    >
      <audio ref={audioRef} src={tracks[currentTrackIndex]} onEnded={handleEnded} />
      <button type='button' className='nes-btn is-warning' onClick={handlePreviousTrack}>
        <Image src='/music-player-icons/previous.svg' alt='previous' width={50} height={50} />
      </button>
      <button type='button' className='nes-btn is-error' onClick={handlePlayPause}>
        <Image src='/music-player-icons/pause.svg' alt='pause' width={50} height={50} />
      </button>
      <button type='button' className='nes-btn is-success' onClick={handlePlayPause}>
        <Image src='/music-player-icons/play.svg' alt='play' width={50} height={50} />
      </button>
      <button type='button' className='nes-btn is-warning' onClick={handleNextTrack}>
        <Image src='/music-player-icons/next.svg' alt='next' width={50} height={50} />
      </button>
    </div>
  );
};

export default MusicPlayer;

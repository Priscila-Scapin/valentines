"use client";
import { useState } from "react";
import "nes.css/css/nes.min.css";
import MusicPlayer from "../components/music-player/music-player";
import BackToHomeButton from "../components/Buttons/back-to-home-button";

const PhotoGallery = () => {
  const pics = ["aniver-pri-24(2).jpg", "elvis-08-24.jpg", "expo-chaves-jul-24.jpg", "home-2024(1).jpg", "luke-aniver-pri-24.jpg", "medieval-fair-may-2025.jpg", "ram-2025.jpg"];
  const [currentPic, setCurrentPic] = useState(0);

  const changePic = (direction) => {
    if (direction === "next") {
      if (currentPic === pics.length) {
        setCurrentPic(0);
      } else {
        setCurrentPic(currentPic + 1);
      }
    } else {
      if (currentPic === pics.length) {
        setCurrentPic(0);
      } else {
        setCurrentPic(currentPic + 1);
      }
    }
  };

  const handleBackHome = () => {
    window.location.href = "https://guess-what-psi.vercel.app/amo-te-mi-carino";
  };
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2.5rem 20rem",
        fontFamily: "'Press Start 2P'",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/backgrounds/photo-gallery-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <div className='flex flex-col items-center gap-8 w-full z-10 relative'>
        <div className='nes-container is-rounded is-dark flex flex-row items-center justify-center gap-2 w-full max-w-[800px]'>
          <p>Photo gallery</p>
          <i className='nes-kirby'></i>
        </div>

        <div className='flex justify-center mt-3 gap-4'>
          <button type='button' className='nes-btn is-success' onClick={() => changePic("next")}>
            Prev
          </button>
          <button type='button' className='nes-btn is-success' onClick={() => changePic("prev")}>
            Next
          </button>
        </div>

        <div
          className='flex justify-center mt-3 gap-4'
          style={{
            width: "50vw",
            height: "60vh",
            border: "6px solid black",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            maxWidth: 1200,
            maxHeight: 800,
          }}
        >
          <img
            src={`/photos/${pics[currentPic]}`}
            alt='Feira medieval - Maio - 2025'
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className='flex justify-center mt-2'>
          <MusicPlayer />
        </div>
        <BackToHomeButton />
      </div>
    </main>
  );
};

export default PhotoGallery;

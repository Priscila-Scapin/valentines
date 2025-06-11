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
    window.location.href = "http://localhost:3000/amo-te-mi-carino";
  };
  return (
    <main className='relative min-h-screen flex justify-center items-center px-80 py-10 font-[Press_Start_2P] text-center overflow-hidden'>
      <div
        className='bg-cover bg-center opacity-30 z-0'
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/backgrounds/photo-gallery-background.jpg')",
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

        <div className='flex justify-center items-center mt-3 gap-4 w-[50vw] h-[60vh] max-w-[1200px] max-h-[800px] border-[6px] border-black overflow-hidden bg-white'>
          <img src={`/photos/${pics[currentPic]}`} alt='Feira medieval - Maio - 2025' className='w-full h-full object-cover object-center' />
        </div>

        <div className='flex justify-center gap-10 mt-2'>
          <MusicPlayer />
        </div>

        <BackToHomeButton />
      </div>
    </main>
  );
};

export default PhotoGallery;

"use client";

import { useState, useEffect, useRef } from "react";

const GetToTheDoors = () => {
  const [position, setPosition] = useState({ x: 10, y: 180 });
  const [effectActive, setEffectActive] = useState(false);

  const style = {
    transition: "all 0.2s ease",
    filter: effectActive ? "contrast(200%) saturate(150%)" : "none",
    transform: effectActive ? "skew(10deg) translateX(5px)" : "none",
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        const step = 10;
        const canvasWidth = 700;
        const canvasHeight = 500;
        const characterSize = 64;

        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case "ArrowUp":
            newY = prev.y - step;
            break;
          case "ArrowDown":
            newY = prev.y + step;
            break;
          case "ArrowLeft":
            newX = prev.x - step;
            break;
          case "ArrowRight":
            newX = prev.x + step;
            break;
          default:
            return prev;
        }

        newX = Math.max(0, Math.min(newX, canvasWidth - characterSize));
        newY = Math.max(0, Math.min(newY, canvasHeight - characterSize));

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const soundPlayed = useRef(false);

  useEffect(() => {
    const isInRange = position.x > 600 && position.x < 800 && position.y > 210 && position.y < 400;
    const yAxisRange = position.x > 200 && position.x < 280 && position.y === 0;

    if (isInRange && !soundPlayed.current) {
      const audio = new Audio("/audio/Secret-Sound.mp3");
      audio.play();
      soundPlayed.current = true;
      setTimeout(function () {
        window.location.href = "https://guess-what-psi.vercel.app/photo-gallery";
      }, 1200);
    }

    if (yAxisRange && !soundPlayed.current) {
      const audio = new Audio("/audio/Secret-Sound.mp3");
      audio.play();
      soundPlayed.current = true;
      setTimeout(function () {
        window.location.href = "https://guess-what-psi.vercel.app/to-do-list";
      }, 1200);
    }

    if (!isInRange) {
      soundPlayed.current = false;
    }
  }, [position]);

  return (
    <div
      style={{
        width: 700,
        height: 500,
        opacity: 0.9,
        overflow: "hidden",
        position: "relative",
        backgroundSize: "cover",
        border: "2px solid black",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/get-to-the-door-sprites/map.png')",
      }}
    >
      <img
        src='/get-to-the-door-sprites/awaiting-babe.gif'
        alt='Personagem'
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          width: 104,
          height: 104,
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
};

export default GetToTheDoors;

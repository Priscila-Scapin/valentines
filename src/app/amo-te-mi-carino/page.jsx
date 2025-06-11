"use client";
import "nes.css/css/nes.min.css";
import { useState, useEffect } from "react";
import MusicPlayer from "../components/music-player/music-player";
import GetToTheDoors from "../components/get-to-the-doors-canva/get-to-the-doors";

const MainCounterPage = () => {
  const [now, setNow] = useState(new Date());

  const firstKiss = new Date("2024-04-13");

  const mainCounter = (date1, date2, unit = "days") => {
    const msDifference = Math.abs(date2 - date1);

    switch (unit) {
      case "milliseconds":
        return msDifference;
      case "seconds":
        return Math.floor(msDifference / 1000);
      case "minutes":
        return Math.floor(msDifference / (1000 * 60));
      case "hours":
        return Math.floor(msDifference / (1000 * 60 * 60));
      case "days":
        return Math.floor(msDifference / (1000 * 60 * 60 * 24));
      case "months": {
        const yearsDiff = date2.getFullYear() - date1.getFullYear();
        const monthsDiff = date2.getMonth() - date1.getMonth();
        return yearsDiff * 12 + monthsDiff;
      }
      case "years":
        return date2.getFullYear() - date1.getFullYear();
      default:
        throw new Error(`Unidade '${unit}' não suportada.`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className='relative h-screen w-full font-[Press_Start_2P] text-center overflow-hidden flex flex-col justify-between items-center'>
      <div className="absolute inset-0 bg-[url('/backgrounds/home-bg.jpg')] bg-cover bg-center opacity-60 z-0"></div>

      <div className='relative z-10 flex flex-col items-center justify-evenly w-full h-full px-2 py-4 space-y-4'>
        <div className='nes-container is-rounded is-dark with-title w-full max-w-4xl text-center'>
          <p className='title'>💖 Babe: 💖</p>
          <p className='text-sm sm:text-base break-words px-2'>'I do know, where you go is where I wanna be.'</p>
          <i className='nes-icon is-large heart mt-2'></i>
        </div>

        <div className='nes-container with-title is-centered w-full max-w-4xl text-center mt-4'>
          <p className='title'>💖✨ Counting every precious moment: 💖✨</p>
          <table className='nes-table is-bordered is-centered w-full table-auto text-[10px] sm:text-xs text-center'>
            <thead>
              <tr>
                <th className='break-words'>Years</th>
                <th className='break-words'>Months</th>
                <th className='break-words'>Days</th>
                <th className='break-words'>Hours</th>
                <th className='break-words'>Minutes</th>
                <th className='break-words'>Seconds</th>
                <th className='break-words'>Milliseconds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mainCounter(firstKiss, now, "years")}</td>
                <td>{mainCounter(firstKiss, now, "months")}</td>
                <td>{mainCounter(firstKiss, now, "days")}</td>
                <td>{mainCounter(firstKiss, now, "hours")}</td>
                <td>{mainCounter(firstKiss, now, "minutes")}</td>
                <td>{mainCounter(firstKiss, now, "seconds")}</td>
                <td>{mainCounter(firstKiss, now, "milliseconds")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='flex flex-col items-center gap-3'>
          <GetToTheDoors />
          <MusicPlayer />
        </div>
      </div>
    </main>
  );
};

export default MainCounterPage;

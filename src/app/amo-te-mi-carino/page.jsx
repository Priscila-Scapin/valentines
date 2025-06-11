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
    <main className='relative min-h-screen w-full font-[Press_Start_2P] text-center overflow-auto flex flex-col justify-between items-center'>
      <div className="absolute inset-0 bg-[url('/backgrounds/home-bg.jpg')] bg-cover bg-center opacity-60 z-0"></div>

      <div className='relative z-10 flex flex-col items-center justify-evenly w-full max-w-screen-md px-4 py-6 space-y-6'>
        {/* Frase inicial */}
        <div className='nes-container is-rounded is-dark with-title w-full'>
          <p className='title text-xs sm:text-sm'>💖 Babe: 💖</p>
          <p className='text-xs sm:text-sm break-words px-2'>'I do know, where you go is where I wanna be.'</p>
          <i className='nes-icon is-large heart mt-2'></i>
        </div>

        {/* Tabela com contador */}
        <div className='nes-container with-title is-centered w-full overflow-x-auto'>
          <p className='title text-xs sm:text-sm'>💖✨ Counting every precious moment: 💖✨</p>
          <table className='nes-table is-bordered is-centered w-full table-auto text-[10px] sm:text-xs'>
            <thead>
              <tr>
                <th className='break-words px-1'>Years</th>
                <th className='break-words px-1'>Months</th>
                <th className='break-words px-1'>Days</th>
                <th className='break-words px-1'>Hours</th>
                <th className='break-words px-1'>Minutes</th>
                <th className='break-words px-1'>Seconds</th>
                <th className='break-words px-1'>Milliseconds</th>
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

        {/* Botões */}
        <div className='flex flex-col items-center gap-3'>
          <GetToTheDoors />
          <MusicPlayer />
        </div>
      </div>
    </main>
  );
};

export default MainCounterPage;

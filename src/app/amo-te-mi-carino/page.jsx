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
    <main className='relative min-h-screen p-10 font-[Press_Start_2P] text-center overflow-hidden'>
      {/* Background com opacidade */}
      <div className="absolute inset-0 bg-[url('/backgrounds/home-bg.jpg')] bg-cover bg-center opacity-60 z-0"></div>

      {/* Conteúdo principal */}
      <div className='relative z-10'>
        <div className='nes-container is-rounded is-dark with-title'>
          <p className='title'>💖 Babe: 💖</p>
          <div>
            <p>Uma vida inteira ainda será pouco para amar vc.💖</p>
          </div>
          <i className='nes-icon is-large heart'></i>
        </div>

        <div className='flex justify-center mt-5'>
          <div className='nes-table-responsive flex self-center'>
            <table className='nes-table is-bordered is-centered'>
              <thead>
                <tr>
                  <th>Years</th>
                  <th>Months</th>
                  <th>Days</th>
                  <th>Hours</th>
                  <th>Minutes</th>
                  <th>Seconds</th>
                  <th>Miliseconds</th>
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
        </div>

        <div className='flex justify-center mt-5'>
          <GetToTheDoors />
        </div>

        <div className='flex justify-center mt-2'>
          <MusicPlayer />
        </div>
      </div>
    </main>
  );
};

export default MainCounterPage;

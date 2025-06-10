"use client";
import useTypewriter from "../components/typewriterText/typewriter-text";
import React, { useEffect, useState } from "react";

const ResponsivePage = () => {
  const [screenSize, setScreenSize] = useState("");

  const checkScreenSize = () => {
    const width = window.innerWidth;

    if (width <= 430) {
      setScreenSize("iphone");
    } else if (width >= 834) {
      window.location.href = "https://guess-what-psi.vercel.app/";
      setScreenSize("ipad+");
    } else {
      window.location.href = "https://guess-what-psi.vercel.app/";
      setScreenSize("other");
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const displayText = useTypewriter("PPlease, help me grow. Can you find a way to bring me to a desktop?", 100);

  return (
    <div className='body grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <div style={{ padding: 40 }}>{screenSize === "iphone" && <p>{displayText}</p>}</div>
      </main>
    </div>
  );
};

export default ResponsivePage;

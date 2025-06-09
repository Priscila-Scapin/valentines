"use client";
import "nes.css/css/nes.min.css";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import loader from "./loader.json";
import pixelSparkles from "./pixelSparkles.json";
import { supabase } from "../../../lib/supabaseClient";
import checkedToDoFirework from "./checkedToDoFirework.json";
import MusicPlayer from "../components/music-player/music-player";
import BackToHomeButton from "../components/Buttons/back-to-home-button";

const ToDosList = () => {
  const [newToDos, setNewToDos] = useState("");
  const [fetchedToDos, setFetchedToDos] = useState();
  const [loading, setIsLoading] = useState(false);
  const [showCreatedToDoLottie, setShowCreatedToDoLottie] = useState(false);
  const [showCheckedToDoLottie, setShowCheckedToDoLottie] = useState(false);

  const fetchToDos = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.error("ToDoss fetch failed with", error);
    } else {
      setIsLoading(false);
      setFetchedToDos([...data]);
    }
  };

  const createToDos = async (e) => {
    e.preventDefault();
    if (!newToDos.trim()) return;

    const { error } = await supabase.from("todos").insert([{ content: newToDos }]);
    if (error) {
      console.error("Erro ao inserir toDos:", error);
      return;
    }

    setShowCreatedToDoLottie(true);
    setTimeout(() => setShowCreatedToDoLottie(false), 2000);
    setNewToDos("");
  };

  const handleAddToDos = (event) => {
    const audio = new Audio("/audio/zelda-heart-pick-up.mp3");
    if (event.key === "Enter") {
      createToDos(event).then(() => fetchToDos());
      audio.play();
    }
  };

  const handleCheckTodos = async (id) => {
    const { error } = await supabase.from("todos").update({ done: true }).eq("id", id);
    const audio = new Audio("/audio/zelda-receive-item.mp3");
    if (error) {
      console.error("Todo update failed with:", error.message);
    } else {
      audio.play();
      setShowCheckedToDoLottie(true);
      setTimeout(() => setShowCheckedToDoLottie(false), 2000);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2.5rem 20rem",
        fontFamily: "'Press Start 2P'",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {showCreatedToDoLottie && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div style={{ width: 400, height: 400 }}>
            <Lottie animationData={pixelSparkles} loop={false} />
          </div>
        </div>
      )}

      {showCheckedToDoLottie && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div style={{ width: 400, height: 400 }}>
            <Lottie animationData={checkedToDoFirework} loop={false} />
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/backgrounds/to-do-list-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      <div className='relative z-10 flex flex-col items-center w-full'>
        <div className='nes-container is-rounded is-dark flex flex-row items-center justify-center gap-5 w-full max-w-[800px] sticky top-0 bg-black bg-opacity-80 py-4 z-20'>
          <p>Goals list</p>
          <i className='nes-icon is-large heart'></i>
        </div>

        <div className='nes-field mt-4 mb-10 w-full max-w-[800px]'>
          <label htmlFor='error_field'>Create a goal:</label>
          <input value={newToDos} onChange={(e) => setNewToDos(e.target.value)} onKeyDown={handleAddToDos} placeholder='Type a new goal and press Enter' className='nes-input' />
        </div>
        {loading ? (
          <div className='absolute inset-0 z-50 flex items-center justify-center pointer-events-none mt-96'>
            <div style={{ width: 400, height: 400 }}>
              <Lottie animationData={loader} loop={false} />
            </div>
          </div>
        ) : (
          <>
            <div className='nes-container is-rounded mt-20 w-full max-w-[800px] text-left space-y-4 flex flex-col'>
              {fetchedToDos?.map((todo, index) => (
                <label key={index} className='flex items-start gap-2'>
                  <input type='checkbox' className='nes-checkbox mt-1' defaultChecked={todo.done} onChange={() => handleCheckTodos(todo.id)} />
                  <span>{todo.content}</span>
                </label>
              ))}
            </div>
            <div className='flex flex-col justify-center mt-5'>
              <MusicPlayer />
            </div>

            <BackToHomeButton />
          </>
        )}
      </div>
    </main>
  );
};

export default ToDosList;

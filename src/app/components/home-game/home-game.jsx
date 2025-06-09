"use client";

import React, { useRef, useEffect, useState } from "react";

const LoginWithGame = () => {
  const canvasRef = useRef(null);
  const [magicWord, setMagicWord] = useState();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameKey, setGameKey] = useState(0); // usado para reiniciar o jogo

  useEffect(() => {
    if (gameCompleted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const paddleHeight = 10;
    const paddleWidth = 110;
    let paddleX = (canvas.width - paddleWidth) / 2;

    const ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;

    let rightPressed = false;
    let leftPressed = false;

    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;

    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    const keyDownHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    };

    const keyUpHandler = (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    const collisionDetection = () => {
      let remaining = 0;
      const blockAudio = new Audio("/audio/block-collision.wav");
      const paddleAudio = new Audio("/audio/paddle-collision.wav");
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            remaining++;

            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              blockAudio.play();
              remaining--;
            }
          }
        }
      }
      if (remaining === 0) {
        setGameCompleted(true);
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          setGameKey((prev) => prev + 1); // reinicia o jogo
          return;
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;

      if (!gameCompleted) requestAnimationFrame(draw);
    };

    draw();

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [gameCompleted, gameKey]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && magicWord === "chimba") {
        const audio = new Audio("/audio/Secret-Sound.mp3");
        audio.play();
        window.location.href = "http://localhost:3000/amo-te-mi-carino";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [magicWord]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {!gameCompleted && <canvas ref={canvasRef} width={480} height={320} style={{ border: "1px solid #000" }} />}

      {gameCompleted && (
        <div className='nes-container with-title is-centered flex flex-column' style={{ width: 500, margin: "auto" }}>
          <div className='nes-field' style={{ marginTop: 12 }}>
            <label htmlFor='password'>Magic word:</label>
            <input type='password' id='password' className='nes-input is-dark' onChange={(e) => setMagicWord(e.target.value)} placeholder='Type the magic word and press enter' style={{ backgroundColor: "#212529", padding: "1rem" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginWithGame;

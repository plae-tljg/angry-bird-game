import React, { useState, useEffect } from 'react';

const AngryBirdGame = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);
  const [birdX, setBirdX] = useState(canvasWidth / 2);
  const [birdY, setBirdY] = useState(canvasHeight / 2);
  const [birdVelocityX, setBirdVelocityX] = useState(0);
  const [birdVelocityY, setBirdVelocityY] = useState(0);
  const [pigX, setPigX] = useState(canvasWidth / 2 + 200);
  const [pigY, setPigY] = useState(canvasHeight / 2);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const drawBird = () => {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(birdX, birdY, 50, 50);
    };

    const drawPig = () => {
      ctx.fillStyle = 'pink';
      ctx.fillRect(pigX, pigY, 50, 50);
    };

    const updateGame = () => {
      if (gameOver) return;

      // Update bird position
      setBirdX(birdX + birdVelocityX);
      setBirdY(birdY + birdVelocityY);

      // Update pig position
      setPigX(pigX - 2);

      // Check collision
      if (birdX + 50 > pigX && birdX < pigX + 50 && birdY + 50 > pigY && birdY < pigY + 50) {
        setScore(score + 1);
        setPigX(canvasWidth / 2 + 200);
        setPigY(canvasHeight / 2);
      }

      // Check game over
      if (birdX < 0 || birdX > canvasWidth || birdY < 0 || birdY > canvasHeight) {
        setGameOver(true);
      }
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setBirdVelocityX((x - birdX) / 10);
      setBirdVelocityY((y - birdY) / 10);
    };

    canvas.addEventListener('mousedown', handleMouseDown);

    const intervalId = setInterval(() => {
      updateGame();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBird();
      drawPig();
    }, 16);

    return () => {
      clearInterval(intervalId);
    };
  }, [birdX, birdY, birdVelocityX, birdVelocityY, pigX, pigY, score, gameOver]);

  return (
    <div>
      <canvas id="canvas" width={canvasWidth} height={canvasHeight} />
      <p>Score: {score}</p>
      {gameOver && <p>Game Over!</p>}
    </div>
  );
};

export default AngryBirdGame;
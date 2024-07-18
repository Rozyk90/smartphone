import styled from "styled-components";

import React, { useState, useEffect, useRef } from "react";

const StyledClockBox = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTime = styled.div`
  border-radius: 8px;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-family: cursive;
  font-weight: 900;
  font-size: x-large;
  color: rgb(255, 170, 13);
`;

interface prop {
  gameStarted: boolean;
  gameEnded: boolean;
}

export default function MemoryClock({ gameStarted, gameEnded }: prop) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      startStopwatch();
    } else {
      stopStopwatch();
      if (gameEnded) {
      }
    }

    return () => {
      stopStopwatch();
    };
  }, [gameStarted, gameEnded]);

  const startStopwatch = () => {
    setIsRunning(true);
    timerRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <StyledClockBox>
      <StyledTime>{formatTime(time)}</StyledTime>
    </StyledClockBox>
  );
}

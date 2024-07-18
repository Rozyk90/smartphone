import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../../../../../redux/hooks";

import gameWin from "../../../../../../sounds/other/gameWin.mp3";
import gameRotation from "../../../../../../sounds/other/gameRotation.mp3";
import gameCollect from "../../../../../../sounds/other/gameCollect.mp3";

import MemoryCard from "./elements/memoryCard";
import MemoryClock from "./elements/memoryClock";
import MemoryWin from "./elements/memoryWin";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 600px;
`;

const StyledName = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(36, 178, 18);
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-family: cursive;
  font-weight: 900;
  font-size: 3rem;
`;

const StyledContainer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledStartScreen = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledStartBtn = styled.button`
  width: 200px;
  height: 50px;
  border: 3px solid black;
  border-radius: 8px;
  color: white;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
    1px 1px 0 black;
  font-family: cursive;
  font-weight: 900;
  font-size: x-large;
  background: rgb(12, 107, 15);
  background: linear-gradient(
    0deg,
    rgba(12, 107, 15, 1) 0%,
    rgba(36, 178, 18, 1) 10%,
    rgba(36, 178, 18, 1) 90%,
    rgba(107, 203, 52, 1) 100%
  );
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    scale: 0.9;
  }
`;

export default function GameMemory() {
  const [soundRotate] = useState(() => {
    const audio = new Audio(gameRotation);
    audio.preload = "none";
    return audio;
  });

  const [soundCollect] = useState(() => {
    const audio = new Audio(gameCollect);
    audio.preload = "none";
    return audio;
  });

  const [soundWin] = useState(() => {
    const audio = new Audio(gameWin);
    audio.preload = "none";
    return audio;
  });

  const [start, setStart] = useState(false);
  const [win, setWin] = useState(false);
  const [numbersGrid, setNumbersGrid] = useState<number[]>([]);
  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  const [selectedOne, setSelectedOne] = useState<number | null>(null);
  const [selectedTwo, setSelectedTwo] = useState<number | null>(null);
  const volume = useAppSelector((state) => state.sound.general.volume);

  const shuffleNumbers = () => {
    const numbers = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10,
    ];
    function getRandomIndex(max: number) {
      return Math.floor(Math.random() * max);
    }

    const randomNumbers = [];
    while (numbers.length > 0) {
      const randomIndex = getRandomIndex(numbers.length);
      const randomNumber = numbers.splice(randomIndex, 1)[0];
      randomNumbers.push(randomNumber);
    }
    setNumbersGrid(randomNumbers);
  };

  const startGame = () => {
    setStart(true);
    shuffleNumbers();
  };

  const winGame = () => {
    setWin(true);
    soundWin.volume = volume / 100;
    soundWin.play();
  };

  const resetGame = ()=>{
    setStart(false)
    setWin(false)
    setCollectedIds([]);
  }

  const rotateSound = () => {
    soundRotate.volume = volume / 100;
    soundRotate.play();
  };

  const collectSound = () => {
    soundCollect.volume = volume / 100;
    soundCollect.play();
  };

  const selectCard = (id: number) => {
    if (!collectedIds.includes(id)) {
      rotateSound();
      selectedOne !== null ? setSelectedTwo(id) : setSelectedOne(id);
    }
  };

  useEffect(() => {
    if (selectedOne !== null && selectedTwo !== null) {
      const compareSign = () => {
        if (numbersGrid[selectedOne] === numbersGrid[selectedTwo]) {
          setCollectedIds((prevCollectedIds) => [
            ...prevCollectedIds,
            selectedOne,
            selectedTwo,
          ]);
          setSelectedOne(null);
          setSelectedTwo(null);
          collectSound();
        } else {
          setSelectedOne(null);
          setSelectedTwo(null);
          rotateSound();
        }
      };

      const timer = setTimeout(() => {
        compareSign();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedOne, selectedTwo]);

  useEffect(() => {
    if (collectedIds.length === 20) {
      const timer = setTimeout(() => {
        winGame();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [collectedIds]);

  return (
    <StyledBody>
      <StyledName>Memory</StyledName>

      {!start ? (
        <StyledStartScreen>
          <StyledStartBtn onClick={() => startGame()}>Start</StyledStartBtn>
        </StyledStartScreen>
      ) : (
        <StyledContainer>
          {numbersGrid.map((num, id) => (
            <MemoryCard
              key={id}
              selected={selectedOne === id || selectedTwo === id}
              collected={collectedIds.includes(id)}
              num={num}
              fnToDo={() =>
                selectedOne === null || selectedTwo === null
                  ? selectCard(id)
                  : null
              }
            />
          ))}
        </StyledContainer>
      )}

      {start && <MemoryClock gameStarted={start} gameEnded={win} />}
      {win && <MemoryWin resetGame={()=>resetGame()} />}

    </StyledBody>
  );
}

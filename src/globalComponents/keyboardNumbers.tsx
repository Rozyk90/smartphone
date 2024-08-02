import React, { useEffect } from "react";
import styled from "styled-components";
import useSound from "../customHooks/useSound";

const KeyboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 15px;
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 200px;
  max-width: 400px;
  margin: 0 auto;
`;

const Key = styled.button<{ $special: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  padding: 10px 0;
  font-size: 1rem;
  background: ${(prop) => (prop.$special ? "grey" : "white")};
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #d0d0d0;
  }
`;

interface KeyboardProps {
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  number: string;
  closeKeyboard?: () => void;
}

export default function KeyboardNumbers({ setNumber, number,closeKeyboard }: KeyboardProps) {
  const { keyboardSoundEffect } = useSound();

  const keyPress = (key: string) => {
    keyboardSoundEffect();
    const validKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    if (key === "←" || key === "Backspace") {
      if(number.length === 0 &&closeKeyboard){
        closeKeyboard()
      }else{
        setNumber((prevNumber) => prevNumber.slice(0, -1));
      }
    } else if (number.length < 9 && validKeys.includes(key)) {
      setNumber((prevNumber) => prevNumber + key);
    }
  };

  const keys = [
    { label: "1", special: false },
    { label: "2", special: false },
    { label: "3", special: false },
    { label: "←", special: true },
    { label: "4", special: false },
    { label: "5", special: false },
    { label: "6", special: false },
    { label: ".", special: true },
    { label: "7", special: false },
    { label: "8", special: false },
    { label: "9", special: false },
    { label: ",", special: true },
    { label: "*", special: true },
    { label: "0", special: false },
    { label: "#", special: true },
    { label: " ", special: true },
  ];

  return (
    <KeyboardContainer>
      {keys.map((key) => (
        <Key
          key={key.label}
          onClick={() => keyPress(key.label)}
          $special={key.special}
        >
          {key.label === " " ? "\u2423" : key.label}
        </Key>
      ))}
    </KeyboardContainer>
  );
}

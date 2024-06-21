import React, { useState } from "react";
import styled from "styled-components";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import SpaceBarRoundedIcon from "@mui/icons-material/SpaceBarRounded";

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  max-width: 400px;
  background: ${(prop) => prop.theme.backgrounds.primary};
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const Key = styled.button<{
  $special: boolean;
  $shiftColor: boolean;
  $shift: boolean;
}>`
  width: ${(props) => (props.$special ? "40px" : "25px")};
  height: 25px;
  margin: 2px;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: ${(props) =>
    props.$shiftColor ? props.theme.colors.primary : "black"};
  cursor: pointer;
  background: #fff;
  text-transform: ${(props) => (props.$shift ? "uppercase" : "none")};

  &:active {
    background: #ddd;
  }
`;

const StyledSpaceKey = styled.button`
  width: 140px;
  height: 25px;
  margin: 2px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: #fff;
  &:active {
    background: #ddd;
  }
`;

export default function KeyboardQWERTY() {
  const [shift, setShift] = useState(false);
  const [specialSings, setSpecialSings] = useState(false);
  const [input, setInput] = useState("");

  const specialRow = ["!", "?", "#", "@", "%", "^", "&", "*", "(", ")"];
  const numbersRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const rows = [
    specialSings ? specialRow : numbersRow,
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
    ["Special", " ", ",", "."],
  ];

  const specialSingsList = ["Shift", "Special", "Backspace"];

  const handleKeyPress = (key: string) => {
    if (key === "Shift") {
      setShift(!shift);
    } else if (key === "Backspace") {
      setInput(input.slice(0, -1));
    } else if (key === "Special") {
      setSpecialSings(!specialSings);
    } else if (key === "Enter") {
      // Handle Enter
      console.log(input);
    } else {
      const newKey = shift ? key.toUpperCase() : key;
      setInput(input + newKey);
      if (shift) setShift(false);
    }
  };

  function specialSingEdit(sing: string) {
    switch (sing) {
      case "Shift":
        return <FileUploadRoundedIcon />;
      case "Backspace":
        return <BackspaceRoundedIcon fontSize="small" />;
      case " ":
        return <SpaceBarRoundedIcon />;
      case "Special":
        return specialSings ? "ABC" : "!?#";
      default:
        return sing;
    }
  }

  const renderKey = (key: string) =>
    key === " " ? (
      <StyledSpaceKey key={key} />
    ) : (
      <Key
        key={key}
        onClick={() => handleKeyPress(key)}
        $special={specialSingsList.includes(key)}
        $shiftColor={shift && key === "Shift"}
        $shift={shift}
      >
        {specialSingEdit(key)}
      </Key>
    );

  return (
    <KeyboardContainer>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>{row.map(renderKey)}</Row>
      ))}
    </KeyboardContainer>
  );
}

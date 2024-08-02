import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import SpaceBarRoundedIcon from "@mui/icons-material/SpaceBarRounded";
import useSound from "../customHooks/useSound";
import { enumCurrentScreen } from "../redux/reducers/screenParts/enumsScreen";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { smsSetNotification } from "../redux/reducers/sms";

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

interface KeyboardProps {
  setTxt: React.Dispatch<React.SetStateAction<string>>;
  txt: string;
  closeKeyboard?: () => void;
}

export default function KeyboardQWERTY({
  setTxt,
  txt,
  closeKeyboard,
}: KeyboardProps) {
  const [shift, setShift] = useState(false);
  const [specialSings, setSpecialSings] = useState(false);
  const {currentScreen} = useAppSelector(state=> state.screen.center)
  const dispatch = useAppDispatch()
  const { keyboardSoundEffect } = useSound();

  const specialRow = ["!", "?", "#", "@", "%", ":", "&", "*", "(", ")"];
  const numbersRow = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const rows = [
    specialSings ? specialRow : numbersRow,
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
    ["Special", " ", ",", "."],
  ];

  const specialSingsList = ["Shift", "Special", "Backspace"];

  const btnAction = (key: string) => {
    if(currentScreen === enumCurrentScreen.conversation){
      dispatch(smsSetNotification(false))
    }
    keyboardSoundEffect();
    if (key === "Shift") {
      setShift(!shift);
    } else if (key === "Backspace") {
      if (txt.length === 0 && closeKeyboard) {
        closeKeyboard();
      } else {
        setTxt((prevTxt) => prevTxt.slice(0, -1));
      }
    } else if (key === "Special") {
      setSpecialSings(!specialSings);
    } else {
      const newKey = shift ? key.toUpperCase() : key;
      setTxt((prevTxt) => prevTxt + newKey);
      if (shift) setShift(false);
    }
  };

  function renderSing(sing: string) {
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

  const renderButton = (key: string) =>
    key === " " ? (
      <StyledSpaceKey key={key} onClick={() => btnAction(key)} />
    ) : (
      <Key
        key={key}
        onClick={() => btnAction(key)}
        $special={specialSingsList.includes(key)}
        $shiftColor={shift && key === "Shift"}
        $shift={shift}
      >
        {renderSing(key)}
      </Key>
    );

  return (
    <KeyboardContainer>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>{row.map(renderButton)}</Row>
      ))}
    </KeyboardContainer>
  );
}

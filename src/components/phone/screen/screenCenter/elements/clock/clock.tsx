import styled from "styled-components";
import { useState } from "react";

import ScreenAlarm from "./screens/screenAlarm";
import ScreenStopwatch from "./screens/screenStopwatch";
import ScreenTimer from "./screens/screenTimer";

import useSound from "../../../../../../customHooks/useSound";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 540px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledBtnsArea = styled.div`
  padding-bottom: 10px;
  width: 310px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 28px;
  left: 0px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledBtnBox = styled.div<{ $selected: boolean }>`
  width: 80px;
  display: flex;
  justify-content: space-around;
  align-items: end;
  border-bottom: 3px solid
    ${(prop) => (prop.$selected ? prop.theme.colors.primary : "transparent")};
`;

const StyledBtn = styled.button<{ $selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bolder;
  height: 30px;
  color: ${(prop) =>
    prop.$selected ? prop.theme.colors.primary : prop.theme.fonts.secondary};
`;

enum btnEnum {
  alarm = "Alarm",
  stopwatch = "Stoper",
  timer = "Minutnik",
}

export default function Clock() {
  const [selectedPage, setSelectedPage] = useState<btnEnum>(btnEnum.alarm);
  const { btnSoundEffect } = useSound();

  return (
    <StyledBody>
      {selectedPage === btnEnum.alarm && <ScreenAlarm />}
      {selectedPage === btnEnum.stopwatch && <ScreenStopwatch />}
      {selectedPage === btnEnum.timer && <ScreenTimer />}

      <StyledBtnsArea>
        <StyledBtnBox $selected={selectedPage === btnEnum.alarm}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.alarm);
            }}
            $selected={selectedPage === btnEnum.alarm}
          >
            {btnEnum.alarm}
          </StyledBtn>
        </StyledBtnBox>{" "}
        <StyledBtnBox $selected={selectedPage === btnEnum.stopwatch}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.stopwatch);
            }}
            $selected={selectedPage === btnEnum.stopwatch}
          >
            {btnEnum.stopwatch}
          </StyledBtn>
        </StyledBtnBox>
        <StyledBtnBox $selected={selectedPage === btnEnum.timer}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.timer);
            }}
            $selected={selectedPage === btnEnum.timer}
          >
            {btnEnum.timer}
          </StyledBtn>
        </StyledBtnBox>
      </StyledBtnsArea>
    </StyledBody>
  );
}

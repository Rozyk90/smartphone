import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState, useRef } from "react";

import useScreen from "../../customHooks/useScreen";
import Screen from "./screen/screen";
import VolumeBtns from "./buttons/volumeBtns";
import MainBtn from "./buttons/mainBtn";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";

const StyledPhone = styled.div<{ $vertical: boolean }>`
  position: relative;
  height: 680px;
  width: 320px;
  border: 5px solid black;
  box-shadow: 0px 0px 0px 2px #7a7a7a,
    8px ${(props) => (props.$vertical ? -10 : 10)}px 25px gray;
  border-radius: 35px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.$vertical ? 0 : -90)}deg);
  transition: 2s;
`;

const StyledChargerInput = styled.div`
  position: absolute;
  bottom: -5px;
  background: gray;
  width: 40px;
  height: 1px;
`;

export default function Phone() {
  const isVertical = useAppSelector((state) => state.basicStates.isVertical);
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  const screenRef = useRef<HTMLDivElement | null>(null);

  const { screenCountdownUpdate } = useScreen();

  useEffect(() => {
    const screenElement = screenRef.current;
    const logBubblingEvent = (e: Event) => {
      screenCountdownUpdate();
    };
    if (screenElement && currentScreen !== enumCurrentScreen.screenNone) {
      screenElement.addEventListener("mousedown", logBubblingEvent, false);
    }
    return () => {
      if (screenElement) {
        screenElement.removeEventListener("mousedown", logBubblingEvent, false);
      }
    };
  });

  return (
    <StyledPhone $vertical={isVertical ? true : false}>
      <VolumeBtns />
      <MainBtn />
      <StyledChargerInput />
      <div ref={screenRef}>
        <Screen />
      </div>
    </StyledPhone>
  );
}

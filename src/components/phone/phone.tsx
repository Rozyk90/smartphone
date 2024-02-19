import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";

import Screen from "./screen/screen";
import { useEffect, useState } from "react";

import VolumeBtns from "./buttons/volumeBtns";
import MainBtn from "./buttons/mainBtn";

const StyledPhone = styled.div<{ vertical: string }>`
  position: relative;
  height: 680px;
  width: 320px;
  border: 5px solid black;
  box-shadow: 0px 0px 0px 2px #7a7a7a,
    8px ${(props) => (props.vertical === "true" ? -10 : 10)}px 25px gray;
  border-radius: 35px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.vertical === "true" ? 0 : -90)}deg);
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

  return (
    <StyledPhone vertical={isVertical ? "true" : "false"}>
      <VolumeBtns />
      <MainBtn />
      <StyledChargerInput />
      <Screen />
    </StyledPhone>
  );
}

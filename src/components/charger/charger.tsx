import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { plugStatus, chargingStatus } from "../../redux/reducers/battery";

import Charging from "./charging";
import Uncharging from "./uncharging";
import useSound from "../../customHooks/useSound";

const StyledCharger = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 400px;
`;

const StyledPlugContainer = styled.div<{ connected: "true" | "false" }>`
  min-height: ${(props) => (props.connected === "true" ? 70 : 180)}px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: 2s;
`;

const StyledPlug = styled.button`
  z-index: 0;
  border: none;
  cursor: pointer;
  position: relative;
  height: 70px;
  width: 50px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 8px -10px 25px gray;
  background: rgb(75, 74, 74);
  background: linear-gradient(
    90deg,
    rgba(75, 74, 74, 1) 10%,
    rgba(0, 0, 0, 1) 40%
  );
  &::before {
    display: block;
    content: "";
    position: absolute;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 10%,
      rgba(224, 222, 222, 1) 50%
    );
    height: 30px;
    width: 34px;
    top: -30px;
    left: 8px;
  }
`;

const StyledCableContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StyledCable = styled.div`
  position: relative;
  background: black;
  width: 10px;
  box-shadow: 8px -10px 25px gray;
`;

export default function Charger() {
  const dispatch = useAppDispatch();
  const isVertical = useAppSelector((state) => state.basicStates.isVertical);
  const isPlugConnected = useAppSelector(
    (state) => state.battery.isPlugConnected
  );
  const isCharging = useAppSelector((state) => state.battery.isCharging);

  const { plugSoundEffect } = useSound();

  const putCharger = () => {
    dispatch(plugStatus());

    if (isVertical) {
      setTimeout(
        () => {
          dispatch(chargingStatus());
          if (!isCharging) {
            plugSoundEffect();
          }
        },
        isCharging ? 200 : 2000
      );
    } else {
      setTimeout(() => {
        dispatch(plugStatus());
      }, 500);
    }
  };

  return (
    <StyledCharger>
      <Charging />
      <Uncharging />

      <StyledPlugContainer connected={isPlugConnected ? "true" : "false"}>
        <StyledPlug onClick={() => putCharger()} />
      </StyledPlugContainer>

      <StyledCableContainer>
        <StyledCable />
      </StyledCableContainer>
    </StyledCharger>
  );
}

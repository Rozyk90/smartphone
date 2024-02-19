import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Button from "@mui/material/Button";

import Phone from "./phone/phone";
import Charger from "./charger/charger";

import { phoneRotate } from "../redux/reducers/basicStates";
import { plugStatus, chargingStatus } from "../redux/reducers/battery";
import CounterActiveScreen from "./functionalities/counterActiveScreen";

const StyledDesign = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const StyledHeader = styled.div`
  flex: 0 1 auto;
  text-align: center;
`;

const StyledMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
`;
const StyledSide = styled.div`
  width: 200px;
  height: 100%;
`;

const StyledBig = styled.div`
  font-size: 50px;
  color: #8b2e2e;
`;

export default function Components() {
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector(state => state.user.isLogged)
  const uid = useAppSelector(state => state.user.uid)
  const isOn = useAppSelector((state) => state.basicStates.isOn);
  const { isScreenActive,isCountingDown } = useAppSelector((state) => state.screen);

  const isVertical = useAppSelector((state) => state.basicStates.isVertical);
  const isPlugConnected = useAppSelector(
    (state) => state.battery.isPlugConnected
  );
  const isCharging = useAppSelector((state) => state.battery.isCharging);
  const batery = useAppSelector((state) => state.battery.battery);
  const isBatteryProtection = useAppSelector(
    (state) => state.battery.isBatteryProtection
  );
  const isFastCharging = useAppSelector(
    (state) => state.battery.isFastCharging
  );
  const modalIsActive = useAppSelector(state => state.modal.isModalActive)

  const counterDown = useAppSelector(state=>state.screen.countDown)

  const rotatePhone = () => {
    if (isCharging) {
      dispatch(plugStatus());

      setTimeout(() => {
        dispatch(chargingStatus());
      }, 200);

      setTimeout(() => {
        dispatch(phoneRotate());
      }, 500);
    } else {
      dispatch(phoneRotate());
    }
  };

  return (
    <StyledDesign>
      <StyledHeader>
    userID = {uid}
    <p></p>
    zalogowany ?? = {isLogged.toString()}
    <p></p>

        jest wlaczony - {isOn.toString()}
   
        <p></p>
        modal jest aktywny - {modalIsActive.toString()}
<p></p>
        ekran aktywny - {isScreenActive.toString()} ---- {counterDown/1000}
        <p></p>
        Jest odliczanie - {isCountingDown.toString()}
        <p></p>
        jest pionowo - {isVertical.toString()}
        <p></p>
        ochrona baterii - {isBatteryProtection.toString()}
        <p></p>
        szybkie ladowanie - {isFastCharging.toString()}
        <p></p>
        wtyczka wlozona - {isPlugConnected.toString()}
        <p></p>
        laduje sie - {isCharging.toString()}
        <p></p>
        <StyledBig>batery - {batery}</StyledBig>
        <p></p>
        <Button variant="contained" onClick={() => rotatePhone()}>
          Obrot
        </Button>
      </StyledHeader>

      <StyledMain>
        <StyledSide></StyledSide>
        <Phone></Phone>

        <StyledSide></StyledSide>
        <>
          <CounterActiveScreen />
        </>
      </StyledMain>
      <Charger />
    </StyledDesign>
  );
}

import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Button from "@mui/material/Button";

import Phone from "./phone/phone";
import Charger from "./charger/charger";

import { phoneRotate } from "../redux/reducers/basicStates";
import { plugStatus, chargingStatus } from "../redux/reducers/battery";
import CounterActiveScreen from "./functionalities/counterActiveScreen";
import {
  minus,
  plus,
  setDarkModeOff,
  setDarkModeOn,
  setTheme,
} from "../redux/reducers/theme";

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

export default function Components() {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector(
    (state) => state.screen.center.currentScreen
  );

  const isLogged = useAppSelector((state) => state.user.isLogged);
  const uid = useAppSelector((state) => state.user.uid);
  const { isOn, isLocked } = useAppSelector((state) => state.basicStates);

  const id = useAppSelector((state) => state.theme.background.id);
  const isCharging = useAppSelector((state) => state.battery.isCharging);
  const modalIsActive = useAppSelector((state) => state.modal.isModalActive);
  const { countDown, countDownTimerSelected, isScreenOn, reversingBoard } =
    useAppSelector((state) => state.screen.general);
  const { isBatteryProtection, isBatteryDescription } = useAppSelector(
    (state) => state.battery
  );
  const { darkMode, currentTheme, darkModeAuto } = useAppSelector(
    (state) => state.theme
  );
  const topBar = useAppSelector((state) => state.screen.barTop.currentBarTop);
  const { mode, volume } = useAppSelector((state) => state.sound.general);
  const {
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
  } = useAppSelector((state) => state.sound.systemVibration);
  const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
    useAppSelector((state) => state.sound.systemSounds);

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

  const zrobTo = () => {
    dispatch(darkMode ? setDarkModeOff() : setDarkModeOn());
  };

  return (
    <StyledDesign>
      <StyledHeader>
        telefon dziala?= {isOn.toString()}
        <p></p>
        telefon zablokowany? = {isLocked.toString()}
        <p></p>
        aktualny ekran = {currentScreen}
        <p></p>
        czas - {countDown / 1000}
        <p></p>
        wybrany czas = {countDownTimerSelected / 1000}
        <p></p>
        rodzaj dzwieku - {mode}
        <p></p>
        głosnosc - {volume}
        <p></p>
        dzwiek klikania - {soundTouch.toString()}
        <p></p>
        dzwiek klawiatury - {soundKeyboard.toString()}
        <p></p>
        dzwiek ladowarki - {soundCharger.toString()}
        <p></p>
        dzwiek blokowania - {soundLockUnlockScreen.toString()}
        <p></p>
        <Button variant="contained" onClick={() => rotatePhone()}>
          Obrot
        </Button>
        <Button variant="contained" onClick={() => zrobTo()}>
          X
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

import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Button from "@mui/material/Button";

import Phone from "./phone/phone";
import Charger from "./charger/charger";

import { phoneRotate } from "../redux/reducers/basicStates";
import { plugStatus, chargingStatus } from "../redux/reducers/battery";
import CounterActiveScreen from "./functionalities/counterActiveScreen";
import { setDarkModeOff, setDarkModeOn, setTheme } from "../redux/reducers/theme";

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
  const currentScreen = useAppSelector((state) => state.screen.center.currentScreen);
  const reversingBoard = useAppSelector(state => state.screen.general.reversingBoard)
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const uid = useAppSelector((state) => state.user.uid);
  const isOn = useAppSelector((state) => state.basicStates.isOn);
  const { isScreenActive, isCountingDown } = useAppSelector(
    (state) => state.screen.general
  );
  const isCharging = useAppSelector((state) => state.battery.isCharging);
  const modalIsActive = useAppSelector((state) => state.modal.isModalActive);
  const counterDown = useAppSelector((state) => state.screen.general.countDown);
  const {isBatteryProtection,isBatteryDescription} = useAppSelector(state => state.battery);
  const {darkMode,currentTheme,darkModeAuto} = useAppSelector(state => state.theme);
  const topBar = useAppSelector(state => state.screen.barTop.currentBarTop);



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
    dispatch(darkMode?setDarkModeOff():setDarkModeOn())
  };


  return (
    <StyledDesign>
      <StyledHeader>
        aktualny ekran = {currentScreen}
        <p></p>
     arr - {reversingBoard.map(x=>x.toString()+'   ')}
   <p></p>
        jest wlaczony - {isOn.toString()}
        <p></p>
    
   
      darkmode = {darkMode.toString()}
      <p></p>
      darkmodeauto = {darkModeAuto.toString()}
      <p></p>
      opis baterii = {isBatteryDescription.toString()}
      <p></p>
      theme = {currentTheme}
      <p></p>
      top bar - {topBar}
      <p></p>


        <Button variant="contained"  onClick={() => rotatePhone()}>
          Obrot
        </Button>

        <Button variant="contained" onClick={() => zrobTo()}>
          do wszystkiego
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

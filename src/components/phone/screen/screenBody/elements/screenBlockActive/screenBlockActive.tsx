import * as React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import {
  signOut
} from "firebase/auth";
import { auth } from "../../../../../../firebase";

import Calendar from "../../../../../apps/calendar/calendar";
import Clock from "../../../../../apps/clock/clock";
import ActionBtn from "./elements/actionBtn";
import Finger from "./elements/finger";
import Inputs from "./elements/inputs";

import { enumClockSizes } from "../../../../../apps/clock/clock";
import { enumCurrentBarBottom, enumCurrentScreen, setCurrentBarBottom, setCurrentScreen, updateScreenCountDown } from "../../../../../../redux/reducers/screen";
import { userLogout } from "../../../../../../redux/reducers/user";

const StyledScreenBlockActive = styled.div`
  height: 100%;
  width: 100%;
`;
const StyledContainerClock = styled.div`
  padding-top: 100px;
  text-align: center;
`;
const StyledContainerCalendar = styled.div`
  text-align: center;
`;
const StyledContainerLogin = styled.div`
  border: 2px solid orange;
  text-align: center;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function ScreenBlockActive() {
  const [showInputs, setShowInputs] = useState(false);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const shortTime = useAppSelector((state) => state.screen.countDownTimerShort);

  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(userLogout);
    await signOut(auth);
  };

  const showInp = () => {
    dispatch(updateScreenCountDown(shortTime));
    setShowInputs(true);
  };


  const setMainScreen = () =>{
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain))
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.on))
  }

  return (
    <StyledScreenBlockActive>
      <StyledContainerClock>
        <Clock size={enumClockSizes.large} />
      </StyledContainerClock>
      <StyledContainerCalendar>
        <Calendar />
      </StyledContainerCalendar>
      <StyledContainerLogin>
        {!isLogged && showInputs && <Inputs />}
        {!showInputs && <Finger onClick={isLogged?setMainScreen:showInp} />}
        {isLogged && <ActionBtn txt="Wyloguj się" fn={logout} />}
      </StyledContainerLogin>
    </StyledScreenBlockActive>
  );
}

import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import { signOut } from "firebase/auth";
import { auth } from "../../../../../../firebase";

import Calendar from "../../../../../time/calendar";
import Clock from "../../../../../time/clocks";
import ActionBtn from "./elements/actionBtn";
import Finger from "./elements/finger";
import Inputs from "./elements/inputs";

import { enumClockSizes } from "../../../../../time/clocks";

import {
  enumCurrentBarBottom,
  enumCurrentScreen,
} from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/screenBarBottom";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";

import { userLogout } from "../../../../../../redux/reducers/user";
import { phoneUnlocked } from "../../../../../../redux/reducers/basicStates";
import useSound from "../../../../../../customHooks/useSound";
import useDefaultSetup from "../../../../../../customHooks/useDefaultSetup";

const StyledBody = styled.div`
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
  border: 3px solid white;
  border-radius: 15px;
  background: #ffffff8d;
  margin: 60px 20px;
  padding: 10px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default function ScreenBlockActive() {
  const [showInputs, setShowInputs] = useState(false);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const dispatch = useAppDispatch();
  const { lockSoundEffect } = useSound();
  const { setDefaultSetup } = useDefaultSetup();

  const logout = async () => {
    await signOut(auth);
    dispatch(userLogout);
    setDefaultSetup();
  };

  const showInp = () => {
    setShowInputs(true);
  };

  const setMainScreen = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
    dispatch(phoneUnlocked());
    lockSoundEffect();
  };

  return (
    <StyledBody>
      <StyledContainerClock>
        <Clock size={enumClockSizes.large} />
      </StyledContainerClock>
      <StyledContainerCalendar>
        <Calendar />
      </StyledContainerCalendar>

      {!showInputs ? (
        <Finger onClick={isLogged ? setMainScreen : showInp} />
      ) : (
        <StyledContainerLogin>
          {!isLogged && <Inputs />}
          {isLogged && <ActionBtn txt="Wyloguj się" fn={logout} />}
        </StyledContainerLogin>
      )}
    </StyledBody>
  );
}

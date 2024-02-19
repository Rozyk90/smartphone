import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../redux/hooks";

import AndroidIcon from "@mui/icons-material/Android";
import {phoneIsRestarting, phoneStopRestarting, phoneTurnOn } from "../../../../../redux/reducers/basicStates";


import { screenTurnOn, setCurrentScreen,enumCurrentScreen } from "../../../../../redux/reducers/screen";


const StyledStartingScreen = styled.div`
  background: #1b1b1b;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLogo = styled.div`
  margin-top: 200px;
  width: 200px;
  color: white;
  font-size: 40px;
  font-weight: 600;
`;

const StyledLogoDescription = styled.div`
  font-size: 30px;
`;

const StyledBottomPart = styled.div`
  margin-top: 250px;
  color: white;
  font-size: 14px;
`;

const StyledBottomDescription = styled.div`
  font-size: 25px;
  display: flex;
  align-items: end;
`;

const StyledAndroindLogo = styled(AndroidIcon)`
  color: #3ddc84;
`;

export default function ScreenStartupAnimation() {
  const [showDescription, setShowDescription] = useState(false);
  const [showBottomDescription, setShowBottomDescription] = useState(false);

  const dispatch = useAppDispatch();
  const {isOn } = useAppSelector((state) => state.basicStates);
  const { currentScreen} = useAppSelector((state) => state.screen);

  useEffect(() => {
    console.log("zaczynam uruchamianie telefonu")
    if (enumCurrentScreen.screenStartupAnimation === currentScreen) {
      const timer = setTimeout(() => {
        setShowDescription(true);
        setShowBottomDescription(true);
      }, 1000);

      const secondTimer = setTimeout(() => {
        setShowBottomDescription(false);
      }, 3000);
      const phoneTurnOnTimeout = setTimeout(() => {
        setShowDescription(true);
        setShowBottomDescription(true);
        dispatch(setCurrentScreen(enumCurrentScreen.screenActiveBlocked));
        dispatch(screenTurnOn())
        dispatch(phoneTurnOn());
        dispatch(phoneStopRestarting())
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(secondTimer);
        clearTimeout(phoneTurnOnTimeout);
      };
    }
  }, []);

  return (
    <StyledStartingScreen>
      <StyledLogo>
        SAMSUNG
        <p></p>
        {showDescription && (
          <StyledLogoDescription>Galaxy</StyledLogoDescription>
        )}
      </StyledLogo>

      {showBottomDescription && (
        <StyledBottomPart>
          Powered by
          <p></p>
          <StyledBottomDescription>
            android <StyledAndroindLogo />
          </StyledBottomDescription>
        </StyledBottomPart>
      )}
    </StyledStartingScreen>
  );
}

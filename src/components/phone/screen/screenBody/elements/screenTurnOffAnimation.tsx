import { useEffect } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import styled from "styled-components";

import { phoneTurnOff } from "../../../../../redux/reducers/basicStates";
import {
  enumCurrentScreen,
  setCurrentScreen,
  screenTurnOff,
} from "../../../../../redux/reducers/screen";

const StyledScreenTrunOffAniamtion = styled.div`
  background: #1b1b1b;
  text-align: center;
  padding-top: 200px;
  color: white;
  font-size: 40px;
  font-weight: 600;
`;

export default function ScreenTurnOffAnimation() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("zaczynam wylaczanie");
    const timer = setTimeout(() => {
      console.log("to sie robi i elo");
      dispatch(phoneTurnOff());
      dispatch(screenTurnOff());
      dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <StyledScreenTrunOffAniamtion>SAMSUNG</StyledScreenTrunOffAniamtion>;
}

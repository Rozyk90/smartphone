import { useEffect } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import styled from "styled-components";

import { phoneTurnOff } from "../../../../../redux/reducers/basicStates";
import { screenTurnOff } from "../../../../../redux/reducers/screenParts/screenGeneral";
import { enumCurrentScreen } from "../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";

const StyledBody = styled.div`
  background: #1b1b1b;
  text-align: center;
  padding-top: 200px;
  color: white;
  font-size: 40px;
  font-weight: 600;
  height: 400px;
`;

export default function ScreenTurnOffAnimation() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(phoneTurnOff());
      dispatch(screenTurnOff());
      dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <StyledBody>SAMSUNG</StyledBody>;
}

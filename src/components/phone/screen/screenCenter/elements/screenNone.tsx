import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";

import { setCurrenBarTop } from "../../../../../redux/reducers/screenParts/screenBarTop";
import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";
import { setCurrentBarBottom } from "../../../../../redux/reducers/screenParts/screenBarBottom";
import {
  enumCurrentBarTop,
  enumCurrentBarBottom,
  enumCurrentScreen,
} from "../../../../../redux/reducers/screenParts/enumsScreen";

import ChargingDescription from "../../../../functionalities/battery/chargingDescription";
import ChargingSpiner from "../../../../functionalities/battery/chargingSpiner";

const StyledScreenNone = styled.button<{$isOn:boolean}>`
  background: #1b1b1b;
  border: none;
  height: 100%;
  width: 100%;
  cursor: ${prop => prop.$isOn? "pointer":'arrow'}
`;

const StyledDescriptionPosition = styled.div`
  padding-top: 450px;
`;
const StyledSpinerPosition = styled.div`
  padding-top: 200px;
`;

export default function ScreenNone() {
  const { isOn, isRestarting } = useAppSelector((state) => state.basicStates);
  const isCharging = useAppSelector((state) => state.battery.isCharging);
  const dispatch = useAppDispatch();

  const fn = () => {
    if (isOn) {
      dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
      dispatch(setCurrentScreen(enumCurrentScreen.screenActiveBlocked));
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparentEmpty));
    }
  };

  return (
    <StyledScreenNone $isOn={isOn}
      onDoubleClick={() => {
        fn();
      }}
    >
      {isOn && isCharging && !isRestarting && (
        <StyledDescriptionPosition>
          <ChargingDescription />
        </StyledDescriptionPosition>
      )}
      {!isOn && isCharging && !isRestarting && (
        <StyledSpinerPosition>
          <ChargingSpiner />
        </StyledSpinerPosition>
      )}
    </StyledScreenNone>
  );
}

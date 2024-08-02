import styled, { keyframes, css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Phone from "./phone/phone";
import Charger from "./charger/charger";
import { phoneRotate } from "../redux/reducers/basicStates";
import { plugStatus, chargingStatus } from "../redux/reducers/battery";
import CounterActiveScreen from "./functionalities/counterActiveScreen";
import ScreenRotationAltRoundedIcon from "@mui/icons-material/ScreenRotationAltRounded";

const StyledDesign = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const StyledHeader = styled.div`
  flex: 0 1 auto;
  text-align: center;
  margin: 50px 0px;
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

const rotate180 = (isVertical: boolean) => keyframes`
  0% {
    transform: rotate(${isVertical ? "0deg" : "180deg"});
    animation-timing-function: ease-in;
  }
  50% {
    transform: rotate(${isVertical ? "-90deg" : "90deg"});
    animation-timing-function: ease-out;
  }
  100% {
    transform: rotate(${isVertical ? "-180deg" : "0deg"});
    animation-timing-function: ease-in;
  }
`;

const StyledRotateBtn = styled.button<{ $isVertical: boolean }>`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 3px solid black;
  background: rgb(6, 131, 161);
  background: radial-gradient(circle, #9aeccd 10%, #1ed2ff 50%, #1e90ff 80%);
  cursor: pointer;
  transition: transform 2s ease-in-out;

  :hover {
    transition: scale(1.2) 2s;
  }

  ${({ $isVertical }) => css`
    transform: rotate(${$isVertical ? "0deg" : "180deg"});
    animation: ${rotate180($isVertical)} 2s forwards;
  `}
`;

export default function Components() {
  const { isVertical } = useAppSelector((state) => state.basicStates);
  const { isCharging } = useAppSelector((state) => state.battery);
  const time = useAppSelector(state => state.screen.general.countDown)
  const dispatch = useAppDispatch();

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
        <StyledRotateBtn $isVertical={isVertical} onClick={rotatePhone}>
          <ScreenRotationAltRoundedIcon fontSize="large" />
        </StyledRotateBtn>
      </StyledHeader>
      <StyledMain>
        <StyledSide />
        <Phone />
        <StyledSide />
        <CounterActiveScreen />
      </StyledMain>
      <Charger />
    </StyledDesign>
  );
}

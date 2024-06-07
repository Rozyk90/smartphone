import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { enumCurrentScreen } from "../../../redux/reducers/screenParts/enumsScreen";

import useScreen from "../../../customHooks/useScreen";
import {
  volumePlus,
  volumeMinus,
  setSoundVibration,
  setSoundOn,
} from "../../../redux/reducers/sound/general";

const StyledBox = styled.div`
  position: absolute;
  right: -10px;
  top: 120px;
  width: 5px;
  height: 90px;
`;
const StyledButton = styled.div`
  width: 5px;
  height: 45px;
  background: #686868;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;
`;

export default function VolumeBtns() {
  const { isLocked, isOn } = useAppSelector((state) => state.basicStates);
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  const { volume } = useAppSelector((state) => state.sound.general);

  const dispatch = useAppDispatch();
  const { screenCountdownUpdate } = useScreen();

  const updateActiveScreen = () => {
    if (currentScreen !== enumCurrentScreen.screenNone) {
      screenCountdownUpdate();
    }
  };

  const topBtn = () => {
    if (!isLocked && isOn) {
      if (volume < 100) {
        dispatch(volumePlus());
      }
      if (volume === 0) {
        dispatch(setSoundOn());
      }
    }
    updateActiveScreen();
  };
  const bottomBtn = () => {
    if (!isLocked && isOn) {
      updateActiveScreen();
      if (volume > 0) {
        dispatch(volumeMinus());
      }
      if (volume === 10) {
        dispatch(setSoundVibration());
      }
    }
  };

  return (
    <StyledBox>
      <StyledButton
        onClick={() => {
          topBtn();
        }}
      />
      <StyledButton
        onClick={() => {
          bottomBtn();
        }}
      />
    </StyledBox>
  );
}

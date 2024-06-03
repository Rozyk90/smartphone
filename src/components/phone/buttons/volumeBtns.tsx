import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { enumCurrentScreen } from "../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../customHooks/useScreen";

const StyledButtonTop1 = styled.div`
  position: absolute;
  right: -10px;
  top: 120px;
  width: 5px;
  height: 45px;
  background: #686868;
  border-top-right-radius: 2px;
  cursor: pointer;
`;

const StyledButtonTop2 = styled.div`
  position: absolute;
  right: -10px;
  top: 165px;
  width: 5px;
  height: 45px;
  background: #686868;
  border-bottom-right-radius: 2px;
  cursor: pointer;
`;

export default function VolumeBtns() {
  const isLocked = useAppSelector((state) => state.basicStates.isLocked);
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  const dispatch = useAppDispatch();
  const { screenCountdownUpdate } = useScreen();

  const updateActiveScreen = () => {
    if (currentScreen !== enumCurrentScreen.screenNone) {
      screenCountdownUpdate();
    }
  };

  return (
    <>
      <StyledButtonTop1
        onClick={() => {
          updateActiveScreen();
        }}
      />
      <StyledButtonTop2
        onClick={() => {
          updateActiveScreen();
        }}
      />
    </>
  );
}

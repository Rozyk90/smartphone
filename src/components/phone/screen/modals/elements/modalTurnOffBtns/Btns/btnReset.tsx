import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../../redux/hooks";

import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";

import {
  enumCurrentScreen,
  setCurrentScreen,
  updateScreenCountDown,
  setStopCountingDown,
  screenTurnOff,
  setCurrentBarBottom,
  enumCurrentBarBottom,
  setCurrenBarTop,
  enumCurrentBarTop,
} from "../../../../../../../redux/reducers/screen";
import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  modalTurnOff,
  setCurrentModal,
  setTurnOffBtnsFocus,
} from "../../../../../../../redux/reducers/modal";
import { phoneIsRestarting } from "../../../../../../../redux/reducers/basicStates";

const StyledBtn = styled.div<{ visible: string; focused: string }>`
  opacity: ${(props) => (props.visible === "true" ? "1" : "0")};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  transition: 0.5s;
  scale: ${(prop) => (prop.focused === "true" ? 1.3 : 1)};
  z-index: ${(props) => (props.focused === "true" ? 1 : 0)};
`;

const StyledBackgroundIcon = styled.button`
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 35%;
  background: #0faa5e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;



export default function BtnReset() {
  const focus = useAppSelector(state => state.modal.turnOffBtnsFocus)
  const shortTime = useAppSelector(state => state.screen.countDownTimerShort)
  const dispatch = useAppDispatch();
  const focused = focus === enumModalTurnOffBtnsFocus.reset;
  const visible = focus === enumModalTurnOffBtnsFocus.reset || focus === enumModalTurnOffBtnsFocus.all;

  const click = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.reset))
    dispatch(updateScreenCountDown(shortTime));
    
    if (focused) {
      dispatch(setCurrentScreen(enumCurrentScreen.screenTurnOffAnimation));
      dispatch(setCurrentModal(enumCurrentModal.modalNone));
      dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all))
      dispatch(updateScreenCountDown(0));
      dispatch(setStopCountingDown())
      dispatch(screenTurnOff());
      dispatch(phoneIsRestarting())
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.off))
      dispatch(setCurrenBarTop(enumCurrentBarTop.off))
      dispatch(modalTurnOff())
     
      setTimeout(() => {
        dispatch(setCurrentScreen(enumCurrentScreen.screenStartupAnimation));
      }, 7000);
    }
  };

  return (
    <StyledBtn focused={focused.toString()} visible={visible.toString()}>
      <StyledBackgroundIcon
        onClick={(e) => {
          click(e);
        }}
      >
        <RotateLeftRoundedIcon sx={{ color: "white", fontSize: "35px" }} />
      </StyledBackgroundIcon>
      Uruchom ponownie
    </StyledBtn>
  );
}

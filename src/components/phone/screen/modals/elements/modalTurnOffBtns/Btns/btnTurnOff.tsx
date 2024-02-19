import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  enumCurrentScreen,
  setCurrenBarTop,
  setCurrentBarBottom,
  setCurrentScreen,
  setStopCountingDown,
  updateScreenCountDown,
} from "../../../../../../../redux/reducers/screen";
import {
  enumCurrentModal,
  setCurrentModal,
  enumModalTurnOffBtnsFocus,
  setTurnOffBtnsFocus,
  modalTurnOff,
} from "../../../../../../../redux/reducers/modal";

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
  position: absolute;
  top: ${(props) => (props.focused === "true" ? 248 : 161)}px;
  z-index: ${(props) => (props.focused === "true" ? 1 : 0)};
`;

const StyledBackgroundIcon = styled.button`
  position: relative;
  width: 45px;
  height: 45px;
  border-radius: 35%;
  background: #48474c;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

export default function BtnTurnOff() {
  const focus = useAppSelector((state) => state.modal.turnOffBtnsFocus);
  const shortTime = useAppSelector(state => state.screen.countDownTimerShort)
  const focused = focus === enumModalTurnOffBtnsFocus.off;
  const visible =
    focus === enumModalTurnOffBtnsFocus.off ||
    focus === enumModalTurnOffBtnsFocus.all;

  const dispatch = useAppDispatch();

  const click = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateScreenCountDown(shortTime))

    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.off))

    if (focused) {

      dispatch(setCurrentScreen(enumCurrentScreen.screenTurnOffAnimation));
      dispatch(setCurrentModal(enumCurrentModal.modalNone));
      dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all))
      dispatch(setStopCountingDown())
      dispatch(updateScreenCountDown(0))
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.off))
      dispatch(setCurrenBarTop(enumCurrentBarTop.off))
      dispatch(modalTurnOff())
    }
  };

  return (
    <StyledBtn focused={focused.toString()} visible={visible.toString()}>
      <StyledBackgroundIcon
        onClick={(e) => {
          click(e);
        }}
      >
        <PowerSettingsNewRoundedIcon
          sx={{ color: "white", fontSize: "35px" }}
        />
      </StyledBackgroundIcon>
      Wyłączenie zasilania
    </StyledBtn>
  );
}

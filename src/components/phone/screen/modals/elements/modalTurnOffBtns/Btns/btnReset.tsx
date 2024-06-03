import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";

import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  setCurrentModal,
  setTurnOffBtnsFocus,
} from "../../../../../../../redux/reducers/modal";
import useModal from "../../../../../../../customHooks/useModal";


import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../../../../../customHooks/useScreen";

const StyledBtn = styled.div<{ visible: string; focused: string }>`
  opacity: ${(props) => (props.visible === "true" ? "1" : "0")};
  color: ${prop=>prop.theme.white};
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
  const focus = useAppSelector((state) => state.modal.turnOffBtnsFocus);
  const dispatch = useAppDispatch();
  const focused = focus === enumModalTurnOffBtnsFocus.reset;
  const visible =
    focus === enumModalTurnOffBtnsFocus.reset ||
    focus === enumModalTurnOffBtnsFocus.all;

  const {modalOff} = useModal()
  const {screenOff} = useScreen()

  const click = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.reset));

    if (focused) {
      // restart phone
      screenOff()
      modalOff()
      dispatch(setCurrentScreen(enumCurrentScreen.screenTurnOffAnimation));
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

import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

import { resetScreenCountingDownShort } from "../../../../../../../redux/reducers/screenParts/screenGeneral";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";

import {
  enumModalTurnOffBtnsFocus,
  setTurnOffBtnsFocus,
} from "../../../../../../../redux/reducers/modal";

import useScreen from "../../../../../../../customHooks/useScreen";
import useModal from "../../../../../../../customHooks/useModal";

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
  const focused = focus === enumModalTurnOffBtnsFocus.off;
  const visible =
    focus === enumModalTurnOffBtnsFocus.off ||
    focus === enumModalTurnOffBtnsFocus.all;

  const dispatch = useAppDispatch();
  const { screenOff } = useScreen();
  const {modalOff} = useModal()

  const click = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(resetScreenCountingDownShort());

    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.off));

    if (focused) {
      screenOff()
      modalOff()
      dispatch(setCurrentScreen(enumCurrentScreen.screenTurnOffAnimation));
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

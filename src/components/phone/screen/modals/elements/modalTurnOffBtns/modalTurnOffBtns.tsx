import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import { Button } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  modalTurnOff,
  setCurrentModal,
  setTurnOffBtnsFocus,
} from "../../../../../../redux/reducers/modal";

import { resetScreenCountingDownShort } from "../../../../../../redux/reducers/screenParts/screenGeneral";
import { enumCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/screenBarBottom";

import BtnTurnOff from "./Btns/btnTurnOff";
import BtnReset from "./Btns/btnReset";
import BtnSos from "./Btns/btnSos";

const StyledPhoneTurnOffModal = styled.div`
  height: 100%;
  width: 100%;
  background: #2c2c2cc7;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  border: 1px solid red;
  position: relative;
`;

const StyledDescription = styled.div`
  margin-top: 5px;
  position: absolute;
  color: ${(prop) => prop.theme.white};
  font-size: 11px;
`;

enum enumDescription {
  off = "Dotknij ponownie, aby wyłączyć telefon",
  reset = "Dotknij jeszcze raz, aby ponownie uruchmoić telefon",
}

const StyledScreenBtn = styled.button`
  position: absolute;
  border: none;
  background: none;
  width: 100%;
  height: 600px;
`;

const StyledButton = styled(Button)`
  && {
    position: absolute;
    bottom: 10px;
    right: 20px;
    color: ${(prop) => prop.theme.white};
    border-radius: 20px;
    height: 24px;
  }
`;

export default function ModalTurnOffBtns() {
  const focus = useAppSelector((state) => state.modal.turnOffBtnsFocus);
  const dispatch = useAppDispatch();

  const clickScreen = () => {
    dispatch(resetScreenCountingDownShort());
    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all));
    if (focus === enumModalTurnOffBtnsFocus.all) {
      dispatch(setCurrentModal(enumCurrentModal.modalNone));
      dispatch(modalTurnOff());
    }
  };

  return (
    <StyledPhoneTurnOffModal>
      <StyledScreenBtn
        onClick={() => {
          clickScreen();
        }}
      ></StyledScreenBtn>
      <BtnTurnOff />
      <BtnReset />
      <BtnSos />

      {(focus === enumModalTurnOffBtnsFocus.off ||
        focus === enumModalTurnOffBtnsFocus.reset) && (
        <StyledDescription>
          {focus === enumModalTurnOffBtnsFocus.off
            ? enumDescription.off
            : enumDescription.reset}
        </StyledDescription>
      )}

      <StyledButton onClick={()=>{clickScreen();}}>
        <ArrowBackIosRoundedIcon fontSize="small" />
      </StyledButton>
    </StyledPhoneTurnOffModal>
  );
}

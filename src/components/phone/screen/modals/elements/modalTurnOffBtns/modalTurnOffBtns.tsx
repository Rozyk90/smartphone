import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  modalTurnOff,
  setCurrentModal,
  setTurnOffBtnsFocus,
} from "../../../../../../redux/reducers/modal";

import { enumCurrentBarBottom, setCurrentBarBottom, updateScreenCountDown } from "../../../../../../redux/reducers/screen";

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
`;

const StyledDescription = styled.div`
  margin-top: 5px;
  position: absolute;
  color: #bebebe;
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

export default function ModalTurnOffBtns() {
  const focus = useAppSelector((state) => state.modal.turnOffBtnsFocus);

  const countDownTimerShort = useAppSelector(
    (state) => state.screen.countDownTimerShort
  );
  const dispatch = useAppDispatch();

  const clickScreen = () => {
    dispatch(updateScreenCountDown(countDownTimerShort));
    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.none))
    if (focus === enumModalTurnOffBtnsFocus.all) {
      dispatch(setCurrentModal(enumCurrentModal.modalNone));
      dispatch(modalTurnOff())
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
    </StyledPhoneTurnOffModal>
  );
}

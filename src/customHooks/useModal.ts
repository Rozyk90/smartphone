import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  setTurnOffBtnsFocus,
  setCurrentModal,
  modalTurnOff,
} from "../redux/reducers/modal";

const useModal = () => {
  const dispatch = useAppDispatch();

  const modalOff = () =>{

    dispatch(modalTurnOff())
    dispatch(setCurrentModal(enumCurrentModal.modalNone));
    dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all))

  }

  return {modalOff};
};


export default useModal
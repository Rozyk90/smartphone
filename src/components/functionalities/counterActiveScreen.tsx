import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  screenTurnOff,
  setCurrenBarTop,
  setCurrentBarBottom,
  setStopCountingDown,
  updateScreenCountDown,
} from "../../redux/reducers/screen";

import {
  setCurrentScreen,
  enumCurrentScreen,
} from "../../redux/reducers/screen";

import {
  modalTurnOff,
  setCurrentModal,
  enumCurrentModal,
  setTurnOffBtnsFocus,
  enumModalTurnOffBtnsFocus,
} from "../../redux/reducers/modal";

export default function CounterActiveScreen() {
  const {
    isScreenActive,
    countDown,
    countDownTimer,
    countDownTimerShort,
    isCountingDown,
  } = useAppSelector((state) => state.screen);
  const dispatch = useAppDispatch();



  useEffect(() => {
    if (isScreenActive && isCountingDown) {
      const timer = setTimeout(() => {
        dispatch(updateScreenCountDown(countDown - 1000));
        if (countDown === 1000) {
          dispatch(screenTurnOff());
          dispatch(setCurrenBarTop(enumCurrentBarTop.off));
          dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
          dispatch(setCurrentBarBottom(enumCurrentBarBottom.off));
          dispatch(modalTurnOff());
          dispatch(setCurrentModal(enumCurrentModal.modalNone));
          dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all));
          dispatch(setStopCountingDown());
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isScreenActive, countDown]);

  return null;
}


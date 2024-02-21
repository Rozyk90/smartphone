import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  screenTurnOff,
  screenTurnOn,
  setCurrentBarBottom,
  enumCurrentBarBottom,
  setCurrentScreen,
  enumCurrentScreen,
  updateScreenCountDown,
  setCurrenBarTop,
  enumCurrentBarTop,
  setStartCountingDown,
  setStopCountingDown,
} from "../../../redux/reducers/screen";

import {
  setCurrentModal,
  enumCurrentModal,
  modalTurnOn,
  modalTurnOff,
} from "../../../redux/reducers/modal";

const StyledButtonMain = styled.div`
  position: absolute;
  right: -10px;
  top: 250px;
  width: 5px;
  height: 40px;
  background: #686868;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  cursor: pointer;
`;

export default function MainBtn() {
  const [doWylaczenia, setDoWylaczenia] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  const { isOn } = useAppSelector((state) => state.basicStates);
  const battery = useAppSelector((state) => state.battery.battery);
  const { isScreenActive, countDownTimerShort } = useAppSelector(
    (state) => state.screen
  );

  const turnOnScreen = () => {
    dispatch(screenTurnOn());
    dispatch(setCurrenBarTop(enumCurrentBarTop.on));
    dispatch(setCurrentScreen(enumCurrentScreen.screenActiveBlocked));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.none));
  };

  const turnOffScreen = () => {
    dispatch(updateScreenCountDown(0));
    dispatch(setStopCountingDown())
    dispatch(screenTurnOff());
    dispatch(setCurrenBarTop(enumCurrentBarTop.off));
    dispatch(setCurrentScreen(enumCurrentScreen.screenNone));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.off));
    dispatch(modalTurnOff());
    dispatch(setCurrentModal(enumCurrentModal.modalNone));
  };

  const press = () => {
    if (isOn) {
      dispatch(updateScreenCountDown(countDownTimerShort));
      dispatch(setStartCountingDown())

      if (!isScreenActive) {
        turnOnScreen();
      }

      if (isScreenActive) {
        timeoutRef.current = setTimeout(() => {
          dispatch(setCurrentModal(enumCurrentModal.modalTurnOffBtns));
          dispatch(modalTurnOn());
          dispatch(setCurrentBarBottom(enumCurrentBarBottom.backOnly));
          dispatch(updateScreenCountDown(countDownTimerShort));
          setDoWylaczenia(false);
        }, 1000);
      }
    } else if(battery>0) {
      dispatch(setCurrentScreen(enumCurrentScreen.screenStartupAnimation));
    }
  };

  const stopPress = () => {
    if (isOn) {
      if (doWylaczenia) {
        setDoWylaczenia(false);
        turnOffScreen();
      } else {
        setDoWylaczenia(true);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }else{

    }
  };

  useEffect(() => {
    if (isScreenActive && isOn) {
      return () => {
        setDoWylaczenia(false);
      };
    }
  }, [isScreenActive]);

  return (
    <StyledButtonMain
      onMouseDown={() => press()}
      onMouseUp={() => stopPress()}
    />
  );
}

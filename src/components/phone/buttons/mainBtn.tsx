import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  screenTurnOn,
  countDownUpdateTime
} from "../../../redux/reducers/screenParts/screenGeneral";

import {
  enumCurrentBarTop,
  enumCurrentBarBottom,
  enumCurrentScreen,
} from "../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../redux/reducers/screenParts/screenBarBottom";
import { setCurrentScreen } from "../../../redux/reducers/screenParts/screenCenter";
import { setCurrenBarTop } from "../../../redux/reducers/screenParts/screenBarTop";

import {
  setCurrentModal,
  enumCurrentModal,
  modalTurnOn,
} from "../../../redux/reducers/modal";
import useScreen from "../../../customHooks/useScreen";
import useModal from "../../../customHooks/useModal";
import useSound from "../../../customHooks/useSound";

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
  const [toTurnOff, setToTurnOff] = useState(false);

  const { isOn } = useAppSelector((state) => state.basicStates);
  const {battery} = useAppSelector((state) => state.battery);
  const { isScreenOn } = useAppSelector((state) => state.screen.general);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const { screenOff,screenCountdownUpdate } = useScreen();
  const { modalOff } = useModal();
  const {lockSoundEffect} = useSound()

  const press = () => {
    if (isOn) {
      if (!isScreenOn) {       // turnOn
        dispatch(screenTurnOn());
        dispatch(countDownUpdateTime(10000))
        dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
        dispatch(setCurrentScreen(enumCurrentScreen.screenActiveBlocked));
        dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparentEmpty));
      }

      if (isScreenOn) {    
        timeoutRef.current = setTimeout(() => {
          dispatch(setCurrentModal(enumCurrentModal.modalTurnOffBtns));
          dispatch(modalTurnOn());
          setToTurnOff(false);
        }, 1000);
      }
    } else if (battery > 0) {
      timeoutRef.current = setTimeout(() => {
        dispatch(setCurrentScreen(enumCurrentScreen.screenStartupAnimation));
      }, 1000);
    }
  };

  const stopPress = () => {
    if (isOn) {
      if (toTurnOff) {    // turnOff Screen
        lockSoundEffect()
        setToTurnOff(false);
        screenOff();
        modalOff();
      } else {
        setToTurnOff(true);
      }
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (isScreenOn && isOn) {
      return () => {
        setToTurnOff(false);
      };
    }
  }, [isScreenOn]);

  return (
    <StyledButtonMain
      onMouseDown={() => press()}
      onMouseUp={() => stopPress()}
    />
  );
}

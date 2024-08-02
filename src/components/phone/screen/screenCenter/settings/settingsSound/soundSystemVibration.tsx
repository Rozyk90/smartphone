import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";

import {
  setVibrationTouchOn,
  setVibrationTouchOff,
  setVibrationKeyboardOn,
  setVibrationKeyboardOff,
  setVibrationChargerOn,
  setVibrationChargerOff,
  setVibrationLockUnlockScreenOn,
  setVibrationLockUnlockScreenOff,
} from "../../../../../../redux/reducers/sound/systemVibrations";
import TitleWithBack from "../../../../../../globalComponents/titleWithBack";
import BtnCardSwitch from "../elements/btnCardSwitch";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
`;

export default function SoundSystemVibration() {
  const {
    vibrationTouch,
    vibrationKeyboard,
    vibrationCharger,
    vibrationLockUnlockScreen,
  } = useAppSelector((state) => state.sound.systemVibration);
  const dispatch = useAppDispatch();

  const toggleVibrationTouch = () => {
    vibrationTouch
      ? dispatch(setVibrationTouchOff())
      : dispatch(setVibrationTouchOn());
  };
  const toggleVibrationKeyboard = () => {
    vibrationKeyboard
      ? dispatch(setVibrationKeyboardOff())
      : dispatch(setVibrationKeyboardOn());
  };
  const toggleVibrationCharger = () => {
    vibrationCharger
      ? dispatch(setVibrationChargerOff())
      : dispatch(setVibrationChargerOn());
  };
  const toggleVibrationLockUnlockScreen = () => {
    vibrationLockUnlockScreen
      ? dispatch(setVibrationLockUnlockScreenOff())
      : dispatch(setVibrationLockUnlockScreenOn());
  };

  const switches = [
    {
      title: "Interakcje dotykowe",
      description: null,
      isActive: vibrationTouch,
      fn: toggleVibrationTouch,
    },
    {
      title: "Dźwięk klawiatury",
      description: null,
      isActive: vibrationKeyboard,
      fn: toggleVibrationKeyboard,
    },
    {
      title: "Ładowanie",
      description: null,
      isActive: vibrationCharger,
      fn: toggleVibrationCharger,
    },
    {
      title: "Blokady/odblokowania ekranu",
      description: null,
      isActive: vibrationLockUnlockScreen,
      fn: toggleVibrationLockUnlockScreen,
    },
  ];
  return (
    <StyledBody>
      <TitleWithBack title="Wibracje systemu" />{" "}
      {switches.map((x) => (
        <BtnCardSwitch
          key={x.title}
          title={x.title}
          description={x.description}
          isActive={x.isActive}
          fn={x.fn}
        />
      ))}
    </StyledBody>
  );
}

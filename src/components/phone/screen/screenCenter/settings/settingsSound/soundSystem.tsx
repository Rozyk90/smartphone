import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";

import {
  setSoundTouchOn,
  setSoundTouchOff,
  setSoundKeyboardOn,
  setSoundKeyboardOff,
  setSoundChargerOn,
  setSoundChargerOff,
  setSoundLockUnlockScreenOn,
  setSoundLockUnlockScreenOff,
} from "../../../../../../redux/reducers/sound/systemSounds";

import Title from "../../../../../../globalComponents/title";
import BtnCardSwitch from "../../../../../../globalComponents/btnCardSwitch";

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

export default function SoundSystem() {
  const { soundTouch, soundKeyboard, soundCharger, soundLockUnlockScreen } =
    useAppSelector((state) => state.sound.systemSounds);
  const dispatch = useAppDispatch();

  const toggleSoundTouch = () => {
    soundTouch ? dispatch(setSoundTouchOff()) : dispatch(setSoundTouchOn());
  };
  const toggleSoundKeyboard = () => {
    soundKeyboard
      ? dispatch(setSoundKeyboardOff())
      : dispatch(setSoundKeyboardOn());
  };
  const toggleSoundCharger = () => {
    soundCharger
      ? dispatch(setSoundChargerOff())
      : dispatch(setSoundChargerOn());
  };
  const toggleSoundLockUnlockScreen = () => {
    soundLockUnlockScreen
      ? dispatch(setSoundLockUnlockScreenOff())
      : dispatch(setSoundLockUnlockScreenOn());
  };

  const switches = [
    {
      title: "Interakcje dotykowe",
      description: null,
      isActive: soundTouch,
      fn: toggleSoundTouch,
    },
    {
      title: "Dźwięk klawiatury",
      description: null,
      isActive: soundKeyboard,
      fn: toggleSoundKeyboard,
    },
    {
      title: "Ładowanie",
      description: null,
      isActive: soundCharger,
      fn: toggleSoundCharger,
    },
    {
      title: "Blokady/odblokowania ekranu",
      description: null,
      isActive: soundLockUnlockScreen,
      fn: toggleSoundLockUnlockScreen,
    },
  ];

  return (
    <StyledBody>
      <Title title="Dźwięki systemu" />
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

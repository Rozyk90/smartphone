import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";

import Title from "../../../../../../globalComponents/title";
import SoundMode from "./elements/soundMode";
import BtnCard from "../../../../../../globalComponents/btnCard";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";

import callSounds from "../../../../../../sounds/callSounds/callSounds";
import notificationSounds from "../../../../../../sounds/notificationSounds/notificationSounds";
import vibrationSounds from "../../../../../../sounds/vibrationSounds/vibrationSounds";
import useScreen from "../../../../../../customHooks/useScreen";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 0px 10px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

export default function SettingsSounds() {
  const {
    callSoundID,
    callVibrationID,
    notificationSoundID,
    notificationVibrationID,
  } = useAppSelector((state) => state.sound.general);
  const dispatch = useAppDispatch();
  const { pushCurrentScreen } = useScreen();

  const openCall = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsCall));
  };
  const openNotificationSound = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsNotification));
  };
  const openSystemSound = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsSystem));
  };
  const openCallVib = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsCallVibration));
  };
  const openNotificationVib = () => {
    pushCurrentScreen();
    dispatch(
      setCurrentScreen(enumCurrentScreen.settingsSoundsNotificationsVibration)
    );
  };
  const openSystemVib = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsSystemVibration));
  };

  return (
    <StyledBody>
      <Title title="Dźwięki i wibracja" />
      <SoundMode />
      <BtnCard
        title="Dzwonek"
        description={callSounds[callSoundID].name}
        fnToDo={openCall}
      />
      <BtnCard
        title="Dźwięk powiadomienia"
        description={notificationSounds[notificationSoundID].name}
        fnToDo={openNotificationSound}
      />
      <BtnCard
        title="Dźwięki systemu"
        description={null}
        fnToDo={openSystemSound}
      />
      <BtnCard
        title="Wibracje połączeń"
        description={vibrationSounds[callVibrationID].name}
        fnToDo={openCallVib}
      />
      <BtnCard
        title="Wibracja powiadomienia"
        description={vibrationSounds[notificationVibrationID].name}
        fnToDo={openNotificationVib}
      />
      <BtnCard
        title="Wibracje systemu"
        description={null}
        fnToDo={openSystemVib}
      />
    </StyledBody>
  );
}

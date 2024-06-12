import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";
import { reversingBoardPush } from "../../../../../../redux/reducers/screenParts/screenGeneral";

import Title from "../../../../../../globalComponents/title";
import SoundMode from "./elements/soundMode";
import BtnCard from "../../../../../../globalComponents/btnCard";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";

import callSounds from "../../../../../../sounds/callSounds/callSounds";
import notificationSounds from "../../../../../../sounds/notificationSounds/notificationSounds";
import vibrationSounds from "../../../../../../sounds/vibrationSounds/vibrationSounds";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding-left: 10px;
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
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  const {
    callSoundID,
    callVibrationID,
    notificationSoundID,
    notificationVibrationID,
  } = useAppSelector((state) => state.sound.general);
  const dispatch = useAppDispatch();

  const openCall = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsCall));
  };
  const openNotificationSound = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsNotification));
  };
  const openSystemSound = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsSystem));
  };
  const openCallVib = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(setCurrentScreen(enumCurrentScreen.settingsSoundsCallVibration));
  };
  const openNotificationVib = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(
      setCurrentScreen(enumCurrentScreen.settingsSoundsNotificationsVibration)
    );
  };
  const openSystemVib = () => {
    dispatch(reversingBoardPush(currentScreen));
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

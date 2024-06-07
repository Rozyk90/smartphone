import styled from "styled-components";

import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";
import { reversingBoardPush } from "../../../../../../redux/reducers/screenParts/screenGeneral";

import Title from "../../../../../../globalComponents/title";
import SoundMode from "./elements/soundMode";
import BtnCard from "../../../../../../globalComponents/btnCard";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";

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
      <BtnCard title="Dzwonek" description="nazwa piosenki" fnToDo={openCall} />
      <BtnCard
        title="Dźwięk powiadomienia"
        description="nazwa dzwieku"
        fnToDo={openNotificationSound}
      />
      <BtnCard
        title="Dźwięki systemu"
        description={null}
        fnToDo={openSystemSound}
      />
      <BtnCard
        title="Wibracje połączeń"
        description="nazwa wibracji"
        fnToDo={openCallVib}
      />
      <BtnCard
        title="Wibracja powiadomienia"
        description="nazwa wibracji"
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

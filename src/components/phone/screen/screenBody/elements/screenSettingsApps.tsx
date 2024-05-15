import styled from "styled-components";


import SettingsTitle from "../../../../../componentsGlobal/settingsTitle";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../redux/reducers/screenParts/enumsScreen";

const StyledApps = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};

  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

export default function ScreenSettingsApps() {

  const dispatch = useAppDispatch()
  const backBtn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettings))
  };


  return (
    <StyledApps>
      <SettingsTitle title="Aplikacje" fnToDo={backBtn} />
    </StyledApps>
  );
}

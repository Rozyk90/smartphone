import styled from "styled-components";
import { useAppDispatch,useAppSelector } from "../../../../../../redux/hooks";

import TitleWithBack from "../../../../../../globalComponents/titleWithBack";
import ScreenPreview from "./elements/screenPreview";
import BtnCard from "../elements/btnCard";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import useScreen from "../../../../../../customHooks/useScreen";

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

export default function ScreenTheme() {
  const dispatch = useAppDispatch();
  const {pushCurrentScreen} = useScreen()


  const openBG = () => {
    pushCurrentScreen()
    dispatch(setCurrentScreen(enumCurrentScreen.settingsThemeBG));
  };
  const openColors = () => {
    pushCurrentScreen()
    dispatch(setCurrentScreen(enumCurrentScreen.settingsThemeColors));
  };

  return (
    <StyledBody>
      <TitleWithBack title="Tapeta i styl"/>
      <ScreenPreview />
      <BtnCard title="Zmień tapety" description={null} fnToDo={openBG} />
      <BtnCard title="Palety kolorów" description={null} fnToDo={openColors} />
    </StyledBody>
  );
}

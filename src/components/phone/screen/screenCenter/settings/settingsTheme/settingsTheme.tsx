import styled from "styled-components";
import { useState } from "react";

import Title from "../../../../../../globalComponents/title";
import ScreenPreview from "./elements/screenPreview";
import BtnCard from "../../../../../../globalComponents/btnCard";
import { useAppDispatch,useAppSelector } from "../../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { reversingBoardPush } from "../../../../../../redux/reducers/screenParts/screenGeneral";

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
  const currentScreen = useAppSelector(state => state.screen.center.currentScreen)
  const dispatch = useAppDispatch();

  const openBG = () => {
    dispatch(reversingBoardPush(currentScreen))
    dispatch(setCurrentScreen(enumCurrentScreen.settingsThemeBG));
  };
  const openColors = () => {
    dispatch(reversingBoardPush(currentScreen))
    dispatch(setCurrentScreen(enumCurrentScreen.settingsThemeColors));
  };

  return (
    <StyledBody>
      <Title title="Tapeta i styl"/>
      <ScreenPreview />
      <BtnCard title="Zmień tapety" description={null} fnToDo={openBG} />
      <BtnCard title="Palety kolorów" description={null} fnToDo={openColors} />
    </StyledBody>
  );
}

import styled from "styled-components";
import { useState } from "react";

import Title from "../../../../../../globalComponents/title";
import ScreenPreview from "./screens/screenPreview";
import CardTitle from "../../../../../../globalComponents/cardTitle";
import { useAppDispatch,useAppSelector } from "../../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { reversingBoardPush } from "../../../../../../redux/reducers/screenParts/screenGeneral";

const StyledTheme = styled.div`
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

export default function ScreenTheme() {
  const currentScreen = useAppSelector(state => state.screen.center.currentScreen)
  const dispatch = useAppDispatch();

  const openBG = () => {
    dispatch(reversingBoardPush(currentScreen))
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettingsThemeBG));
  };
  const openColors = () => {
    dispatch(reversingBoardPush(currentScreen))
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettingsThemeColors));
  };

  return (
    <StyledTheme>
      <Title title="Tapeta i styl"/>
      <ScreenPreview />
      <CardTitle title="Zmień tapety" fnToDo={openBG} />
      <CardTitle title="Palety kolorów" fnToDo={openColors} />
    </StyledTheme>
  );
}

import styled from "styled-components";
import SettingsTitle from "../../../../../../../componentsGlobal/settingsTitle";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { enumTheme, colors } from "../../../../../../../theme/theme";
import theme, { setTheme } from "../../../../../../../redux/reducers/theme";
import ScreenCalculator from "./screens/screenCalculator";
import SwitchField from "../../../../../../../componentsGlobal/switchField";
import { useState } from "react";
import ScreenSettings from "./screens/screenSettings";

const StyledThemeColors = styled.div``;

const StyledScreens = styled.div`
  height: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledSwitchBox = styled.div`
  margin: 20px 0px;
`;

const StyledColorsArea = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  border-radius: 16px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledTitle = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-weight: 600;
  font-size: 1.2rem;
`;

const StyledColorsBox = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledColor = styled.button<{ $color: string }>`
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${(prop) => prop.$color};
`;

const StyledSelectedMarker = styled(TaskAltRoundedIcon)`
  margin-top: 3px;
  color: ${(prop) => prop.theme.onPrimary};
`;

const StyledColorsShadow = styled.div`
  background: #7c7c7cba;
  border-radius: 16px;
  height: 160px;
  width: 290px;
  position: absolute;
`;

export default function ThemeColors({ setColors }: { setColors: () => void }) {
  const { currentTheme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const setNewTheme = (theme: enumTheme) => {
    dispatch(setTheme(theme));
  };

  return (
    <StyledThemeColors>
      <SettingsTitle title="Paleta kolorów" fnToDo={setColors} />

      <StyledScreens>
        <ScreenCalculator />
        <ScreenSettings/>
      </StyledScreens>
      <StyledSwitchBox>
        <SwitchField
          title="Paleta kolorów"
          description={null}
          isActive={currentTheme !== enumTheme.themeBasic}
          fn={() =>
            setNewTheme(
              currentTheme === enumTheme.themeBasic
                ? enumTheme.themeOrange
                : enumTheme.themeBasic
            )
          }
        />
      </StyledSwitchBox>
      <StyledColorsArea>
        <StyledTitle>Paleta kolorów</StyledTitle>
        <StyledColorsBox>
          {Object.entries(colors).map(([id, color]) =>
            enumTheme.themeBasic !== color.name ? (
              <StyledColor
                key={id}
                $color={color.primary}
                onClick={() => setNewTheme(color.name)}
              >
                {color.name === currentTheme && <StyledSelectedMarker />}
              </StyledColor>
            ) : null
          )}
        </StyledColorsBox>
        {currentTheme === enumTheme.themeBasic && <StyledColorsShadow />}
      </StyledColorsArea>
    </StyledThemeColors>
  );
}

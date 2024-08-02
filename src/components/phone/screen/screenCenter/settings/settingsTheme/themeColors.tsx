import styled from "styled-components";
import TitleWithBack from "../../../../../../globalComponents/titleWithBack";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import { enumTheme, colors } from "../../../../../../theme/theme";
import { setTheme } from "../../../../../../redux/reducers/theme";
import ScreenCalculator from "./elements/screenCalculator";
import BtnCardSwitch from "../elements/btnCardSwitch";
import ScreenSettings from "./elements/screenSettings";
import useSound from "../../../../../../customHooks/useSound";

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
  height: 130px;
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
  padding: 5px 0px;
`;

const StyledColor = styled.button<{ $color: string }>`
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${(prop) => prop.$color};
  cursor: pointer;
`;

const StyledSelectedMarker = styled(TaskAltRoundedIcon)`
  margin-top: 3px;
  color: ${(prop) => prop.theme.onPrimary};
`;

const StyledColorsShadow = styled.div`
  background: #7c7c7cba;
  border-radius: 14px;
  height: 130px;
  width: 290px;
  position: absolute;
  bottom: 58px;
`;

export default function SettingsThemeColors() {
  const { currentTheme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();

  const setNewTheme = (theme: enumTheme) => {
    dispatch(setTheme(theme));
  };

  return (
    <StyledBody>
      <TitleWithBack title="Paleta kolorów" />
      <StyledScreens>
        <ScreenCalculator />
        <ScreenSettings />
      </StyledScreens>
      <StyledSwitchBox>
        <BtnCardSwitch
          title="Paleta kolorów"
          description={null}
          isActive={currentTheme !== enumTheme.themeBasic}
          fn={() =>
            setNewTheme(
              currentTheme === enumTheme.themeBasic
                ? enumTheme.themeRed
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
                onMouseDown={() => btnSoundEffect()}
              >
                {color.name === currentTheme && <StyledSelectedMarker />}
              </StyledColor>
            ) : null
          )}
        </StyledColorsBox>
        {currentTheme === enumTheme.themeBasic && <StyledColorsShadow />}
      </StyledColorsArea>
    </StyledBody>
  );
}

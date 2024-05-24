import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import {
  colors,
  lightModeTheme,
  darkModeTheme,
  enumTheme,
} from "../../../../../../theme/theme";
import {
  setDarkModeOff,
  setDarkModeOn,
  setDarkModeAutoOff,
  setDarkModeAutoOn,
} from "../../../../../../redux/reducers/theme";

import {
  batteryDescriptionOn,
  batteryDescriptionOff,
} from "../../../../../../redux/reducers/battery";

import Title from "../../../../../../globalComponents/title";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SwitchField from "../../../../../../globalComponents/switchField";

const StyledScreen = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};

  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 0px 10px;
`;

const StyledCard = styled.div`
  border-radius: 16px;
  background: ${(prop) => prop.theme.colors.background};
`;

const StyledScreensBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
`;

const StyledScreenMod = styled.div<{ $bg: string }>`
  border: 2px solid gray;
  border-radius: 16px;
  height: 90px;
  width: 120px;
  background: ${(prop) => prop.$bg};
  display: flex;
  justify-content: center;
`;

const StyledScreenCard = styled.div<{ $card: string }>`
  height: 40px;
  width: 80px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 12px;
  background: ${(prop) => prop.$card};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledScreenDot = styled.div<{ $dot: string }>`
  background: ${(prop) => prop.$dot};
  height: 12px;
  width: 12px;
  border-radius: 50%;
`;

const StyledScreenFont = styled.div<{ $font: string }>`
  background: ${(prop) => prop.$font};
  width: 50px;
  height: 8px;
`;

const mods = [
  {
    bg: lightModeTheme.backgrounds.primary,
    card: colors[enumTheme.themeBasic].background,
    dot: colors[enumTheme.themeBasic].primary,
    font: lightModeTheme.fonts.primary,
  },
  {
    bg: darkModeTheme.backgrounds.primary,
    card: colors[enumTheme.themeBasic].background,
    dot: colors[enumTheme.themeBasic].primary,
    font: darkModeTheme.fonts.primary,
  },
];

const StyledBtns = styled(RadioGroup)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;
const StyledLabel = styled(FormControlLabel)`
  && {
    color: ${(prop) => prop.theme.fonts.primary};
  }
`;
const StyledRadio = styled(Radio)`
  && {
    color: ${(props) => props.theme.colors.primary};
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function ScreenSettingsScreen() {
  const { darkMode, darkModeAuto } = useAppSelector((state) => state.theme);
  const isBatteryDescription = useAppSelector(
    (state) => state.battery.isBatteryDescription
  );
  const dispatch = useAppDispatch();

  const darkModeAutoFn = () => {
    dispatch(darkModeAuto ? setDarkModeAutoOff() : setDarkModeAutoOn());
  };

  const batteryDescription = () => {
    dispatch(
      isBatteryDescription ? batteryDescriptionOff() : batteryDescriptionOn()
    );
  };

  return (
    <StyledScreen>
      <Title title="Wyświetlacz" />
      <StyledCard>
        <StyledScreensBox>
          {mods.map((mod, id) => (
            <StyledScreenMod key={id} $bg={mod.bg}>
              <StyledScreenCard $card={mod.card}>
                <StyledScreenDot $dot={mod.dot} />
                <StyledScreenFont $font={mod.font} />

                <StyledScreenDot $dot={mod.dot} />
                <StyledScreenFont $font={mod.font} />
              </StyledScreenCard>
            </StyledScreenMod>
          ))}
        </StyledScreensBox>
        <StyledBtns>
          <StyledLabel
            checked={!darkMode}
            onClick={() => dispatch(setDarkModeOff())}
            value="Jasny"
            control={<StyledRadio />}
            label="Jasny"
          />
          <StyledLabel
            checked={darkMode}
            onClick={() => dispatch(setDarkModeOn())}
            value="Ciemny"
            control={<StyledRadio />}
            label="Ciemny"
          />
        </StyledBtns>
      </StyledCard>

      <SwitchField
        title="Automatyczny tryb ciemny"
        description="Włącz automatyczny tryb ciemny od 22:00 do 6:00, aby zmniejszyć zmęczenie oczu w nocy."
        isActive={darkModeAuto}
        fn={darkModeAutoFn}
      />
      <SwitchField
        title="Pokaż info. o ładowaniu"
        description="Pokazuj stan baterii i szacowany czas do pełnego naładowania, kiedy
          funkcja Always On Display jest wyłączona lub niewyswietlana."
        isActive={isBatteryDescription}
        fn={batteryDescription}
      />
    </StyledScreen>
  );
}

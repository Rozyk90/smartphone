import styled from "styled-components";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";

import {
  colors,
  lightModeTheme,
  darkModeTheme,
  enumTheme,
} from "../../../../../../../theme/theme";

import {
  setDarkModeOff,
  setDarkModeOn,
} from "../../../../../../../redux/reducers/theme";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useSound from "../../../../../../../customHooks/useSound";

const StyledBody = styled.div`
  border-radius: 14px;
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

const StyledLabel = styled(FormControlLabel)<{ $isActive: boolean }>`
  && {
    color: ${(props) =>
      props.$isActive ? props.theme.colors.primary : props.theme.off};
  }
`;

const StyledRadio = styled(Radio)<{ $isActive: boolean }>`
  && {
    color: ${(props) =>
      props.$isActive ? props.theme.colors.primary : props.theme.off};
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function SampleTheme() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const {btnSoundEffect} = useSound()

  return (
    <StyledBody>
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
          $isActive={!darkMode}
          checked={!darkMode}
          onClick={() => dispatch(setDarkModeOff())}
          onMouseDown={()=>btnSoundEffect()}
          value="Jasny"
          control={<StyledRadio $isActive={!darkMode} />}
          label="Jasny"
          labelPlacement="top"
        />
        <StyledLabel
          $isActive={darkMode}
          checked={darkMode}
          onClick={() => dispatch(setDarkModeOn())}
          onMouseDown={()=>btnSoundEffect()}
          value="Ciemny"
          control={<StyledRadio $isActive={darkMode} />}
          label="Ciemny"
          labelPlacement="top"
        />
      </StyledBtns>
    </StyledBody>
  );
}

import styled from "styled-components";

import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VibrationRoundedIcon from "@mui/icons-material/VibrationRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  border-radius: 14px;
  padding: 14px;
`;

const StyledIcons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
    &&{
        color: ${prop => prop.theme.off}

}
`

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

export default function SoundMode() {
  return (
    <StyledBody>
        <StyledIcons>
            <VolumeUpRoundedIcon fontSize="large" sx={{color:'red'}}/>
            <VibrationRoundedIcon fontSize="large"/>
            <VolumeOffRoundedIcon fontSize="large"/>
        </StyledIcons>
      <StyledBtns>
        <StyledLabel
          //   checked={!darkMode}
          //   onClick={() => dispatch(setDarkModeOff())}
          value="Dźwięk"
          control={<StyledRadio />}
          label="Dźwięk"
          labelPlacement="top"
        />
   
        <StyledLabel
          //   checked={darkMode}
          //   onClick={() => dispatch(setDarkModeOn())}
          value="Wibracja"
          control={<StyledRadio />}
          label="Wibracja"
          labelPlacement="top"
        />
        <StyledLabel
          //   checked={darkMode}
          //   onClick={() => dispatch(setDarkModeOn())}
          value="Wycisz"
          control={<StyledRadio />}
          label="Wycisz"
          labelPlacement="top"
        />
      </StyledBtns>
    </StyledBody>
  );
}

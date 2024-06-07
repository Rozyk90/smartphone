import styled from "styled-components";
import { useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VibrationRoundedIcon from "@mui/icons-material/VibrationRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  enumSoundModes,
  setSoundOff,
  setSoundOn,
  setSoundVibration,
} from "../../../../../../../redux/reducers/sound/general";

import click from "../../../../../../../sounds/systemSounds/click.mp3";
import vibrationL from "../../../../../../../sounds/systemSounds/vibrationLight.mp3";

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
`;

const StyledIcon = styled.div<{ isActive: boolean }>`
  && {
    color: ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.off};
  }
`;

const StyledBtns = styled(RadioGroup)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const StyledLabel = styled(FormControlLabel)<{ isActive: boolean }>`
  && {
    color: ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.off};
    & .MuiFormControlLabel-label {
      font-size: 13px;
      font-weight: 600;
    }
  }
`;

const StyledRadio = styled(Radio)<{ isActive: boolean }>`
  && {
    color: ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.off};
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export default function SoundMode() {
  const [clickSound] = useState(new Audio(click));
  const [vibrationLight] = useState(new Audio(vibrationL));

  const { mode } = useAppSelector((state) => state.sound.general);
  const dispatch = useAppDispatch();

  const sound = () => {
    clickSound.volume = 0.5;
    clickSound.play();
    dispatch(setSoundOn());
  };

  const vibration = () => {
    vibrationLight.volume = 1;
    vibrationLight.play();
    dispatch(setSoundVibration());
  };

  return (
    <StyledBody>
      <StyledIcons>
        <StyledIcon isActive={mode === enumSoundModes.on}>
          <VolumeUpRoundedIcon fontSize="large" />
        </StyledIcon>
        <StyledIcon isActive={mode === enumSoundModes.vibration}>
          <VibrationRoundedIcon fontSize="large" />
        </StyledIcon>
        <StyledIcon isActive={mode === enumSoundModes.off}>
          <VolumeOffRoundedIcon fontSize="large" />
        </StyledIcon>
      </StyledIcons>
      <StyledBtns>
        <StyledLabel
          isActive={mode === enumSoundModes.on}
          checked={mode === enumSoundModes.on}
          onMouseDown={() => sound()}
          value="Dźwięk"
          control={<StyledRadio isActive={mode === enumSoundModes.on} />}
          label="Dźwięk"
          labelPlacement="top"
        />
        <StyledLabel
          isActive={mode === enumSoundModes.vibration}
          checked={mode === enumSoundModes.vibration}
          onMouseDown={() => vibration()}
          value="Wibracja"
          control={<StyledRadio isActive={mode === enumSoundModes.vibration} />}
          label="Wibracja"
          labelPlacement="top"
        />
        <StyledLabel
          isActive={mode === enumSoundModes.off}
          checked={mode === enumSoundModes.off}
          onClick={() => dispatch(setSoundOff())}
          value="Wycisz"
          control={<StyledRadio isActive={mode === enumSoundModes.off} />}
          label="Wycisz"
          labelPlacement="top"
        />
      </StyledBtns>
    </StyledBody>
  );
}

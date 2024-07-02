import styled from "styled-components";
import { useState,useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../../../../../../redux/hooks";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TitleWithBack from "../../../../../../globalComponents/titleWithBack";

import notificationSounds from "../../../../../../sounds/notificationSounds/notificationSounds";
import { setNotificationSound } from "../../../../../../redux/reducers/sound/general";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledBtns = styled(RadioGroup)`
  && {
    margin-top: 50px;
    display: flex;
    gap: 20px;
  }
`;

const StyledLabel = styled(FormControlLabel)`
  && {
    border: none;
    border-radius: 14px;
    background: ${(prop) => prop.theme.colors.background};
    margin-left: 16px;
    cursor: pointer;
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
export default function SoundNotification() {
  const [audio, setAudio] = useState(new Audio(notificationSounds[0].path))
  const {volume,notificationSoundID} = useAppSelector((state) => state.sound.general);
  const dispatch = useAppDispatch()

  const selectSound = (path:string,soundId:number) => {
    dispatch(setNotificationSound(soundId))
    const newAudio = new Audio(path);
    newAudio.addEventListener("loadeddata", () => {
      setAudio(newAudio);
      newAudio.volume = volume / 100;
      newAudio.play();
    });
  };

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <StyledBody>
      <TitleWithBack title="Dzwonek" />
      <StyledBtns>
        {notificationSounds.map((sound) => (
          <StyledLabel
            key={sound.id}
            value={sound.name}
            control={<StyledRadio />}
            label={sound.name}
            checked={notificationSoundID===sound.id}
            onClick={() => {
              selectSound(sound.path,sound.id);
            }}
          />
        ))}
      </StyledBtns>
    </StyledBody>
  );
}

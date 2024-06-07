import styled from "styled-components";
import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Title from "../../../../../../globalComponents/title";

import sound1 from "../../../../../../sounds/sound1.mp3";
import sound2 from "../../../../../../sounds/sound2.mp3";
import sound3 from "../../../../../../sounds/sound3.mp3";

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

export default function SoundCall() {
  const [audio, setAudio] = useState(new Audio(sound1)); // Użyj useState do utworzenia stanu audio
  const [volume, setVolume] = useState(1); // Stan głośności, domyślnie ustawiony na maksymalną głośność (1)

  const play = () => {
    audio.volume = volume; // Ustaw głośność przed odtworzeniem
    audio.play(); // Odtwórz dźwięk
  };

  const stop = () => {
    audio.pause(); // Zatrzymaj odtwarzanie dźwięku
    audio.currentTime = 0; // Ustaw czas odtwarzania na początek
  };

  const changeSound = () => {
    const newSound = audio.src === sound1 ? sound3 : sound1; // Porównujemy src audio z src dźwięku sound1
    const newAudio = new Audio(newSound);
    newAudio.volume = volume; // Ustaw głośność na nowym audio
    setAudio(newAudio); // Ustawiamy nowy dźwięk w stanie
  };

  const handleVolumeChange = (event:any) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audio.volume = newVolume; // Ustaw nową głośność na aktualnym audio
  };

  return (
    <StyledBody>
      <Title title="Dzwonek" />
      {audio.toString()}
      <p></p>
      czas - {audio.currentTime}
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button> {/* Przycisk zatrzymania dźwięku */}
      <button onClick={()=>{setAudio(new Audio(sound1))}}>song 1</button> {/* Przycisk zmiany dźwięku */}
      <button onClick={()=>{setAudio(new Audio(sound2))}}>song 2</button> {/* Przycisk zmiany dźwięku */}
      <button onClick={()=>{setAudio(new Audio(sound3))}}>song 3</button> {/* Przycisk zmiany dźwięku */}

      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume} 
        onChange={handleVolumeChange} 
      /> {/* Suwak do regulacji głośności */}
    </StyledBody>
  );
}








      {/* <StyledBtns>
        {sounds.map((sound) => (
          <StyledLabel
            key={sound}
            // checked={time === countDownTimerSelected}
            // onClick={() => dispatch(countDownSetTimer(time))}
            value={sound}
            control={<StyledRadio />}
            label={sound}
          />
        ))}
      </StyledBtns> */}
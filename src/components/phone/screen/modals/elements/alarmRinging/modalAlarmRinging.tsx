import styled from "styled-components";
import useUtilities from "../../../../../../customHooks/useUtilities";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import useDate from "../../../../../../customHooks/useDate";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {
  enumCurrentModal,
  modalTurnOff,
  setCurrentModal,
} from "../../../../../../redux/reducers/modal";
import useSound from "../../../../../../customHooks/useSound";
import alarm from "../../../../../../sounds/other/alarm.mp3";

const StyledBody = styled.div<{ $bg: string }>`
  background: ${(prop) => prop.$bg};
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledHour = styled.div`
  margin-top: 80px;
  font-size: 4rem;
  color: ${(prop) => prop.theme.fonts.primary};
`;
const StyledDay = styled.div`
  font-size: 1.2rem;
  color: ${(prop) => prop.theme.fonts.primary};
`;

const StyledTitle = styled.div`
  margin-top: 60px;
  font-size: 2rem;
`;

const StyledDescription = styled.div``;

const StyledBtn = styled.div`
  margin-top: 150px;
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 70px;
  width: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function ModalAlarmRinging() {
  const { getUnixTime, getPolishTime } = useDate();
  const { generateRandomGradient } = useUtilities();
  const { btnSoundEffect } = useSound();
  const [gradient, setGradient] = useState(generateRandomGradient);
  const { alarmData } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const day = getPolishTime(getUnixTime());

  const [alarmSound] = useState(() => {
    const audio = new Audio(alarm);
    audio.preload = "none";
    return audio;
  });

  const playAlarmSound = () => {
    alarmSound.play();
  };

  const turnOff = () => {
    dispatch(modalTurnOff());
    dispatch(setCurrentModal(enumCurrentModal.modalNone));

    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmSound.removeEventListener("ended", playAlarmSound);
  };

  useEffect(() => {
    if (alarmSound) {
      playAlarmSound();

      alarmSound.addEventListener("ended", playAlarmSound);
    }
  }, []);

  return (
    <StyledBody $bg={gradient}>
      <StyledHour>{`${day.hours}:${day.minutes}`}</StyledHour>

      <StyledDay>{`${day.dayName} ${day.dayOfMonth}.${day.monthOfYear}.${day.year}`}</StyledDay>

      <StyledTitle>{alarmData.title}</StyledTitle>
      <StyledDescription>{alarmData.description}</StyledDescription>
      <StyledBtn onMouseDown={btnSoundEffect} onClick={turnOff}>
        <ClearRoundedIcon fontSize="large" />
      </StyledBtn>
    </StyledBody>
  );
}

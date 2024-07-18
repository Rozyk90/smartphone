import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import soundCalling from '../../../../../../sounds/other/soundCalling.mp3'
import soundCallingMissed from '../../../../../../sounds/other/soundCallingMissed.mp3'

import CallEndIcon from "@mui/icons-material/CallEnd";
import useContacts from "../../../../../../customHooks/useContacts";
import useUtilities from "../../../../../../customHooks/useUtilities";
import useScreen from "../../../../../../customHooks/useScreen";
import { setCurrenBarTop } from "../../../../../../redux/reducers/screenParts/screenBarTop";
import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
} from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/screenBarBottom";

const StyledBody = styled.div<{ $bg: string }>`
  background: ${(prop) => prop.$bg};
  height: 656px;
  width: 100%;
  border-radius: 18px;
  position: absolute;
  top: 0px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDescriptiopnTop = styled.div`
  margin-top: 80px;
  color: ${(prop) => prop.theme.fonts.primary};
`;

const StyledTitle = styled.div`
  margin-top: 50px;
  font-size: 2.5rem;
  color: ${(prop) => prop.theme.fonts.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const StyledDescriptiopn = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
`;

const StyledBtn = styled.button`
  background: ${(prop) => prop.theme.declain};
  margin-top: 300px;
  border-radius: 50%;
  border: none;
  height: 60px;
  width: 60px;
  cursor: pointer;
  color: ${(prop) => prop.theme.onDeclain};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Calling() {
  const [callingSound] = useState(() => {
    const audio = new Audio(soundCalling);
    audio.preload = "none";
    return audio;
  });
  const [missedSound] = useState(() => {
    const audio = new Audio(soundCallingMissed);
    audio.preload = "none";
    return audio;
  });

  const { generateRandomGradient } = useUtilities();
  const { backToPreviousScreen } = useScreen();
  const { findContactName, editContactNumber } = useContacts();

  const [gradient] = useState(generateRandomGradient());
  const { callingNumber } = useAppSelector((state) => state.contacts.general);

  const title = findContactName(callingNumber);
  const dispatch = useAppDispatch();

  const stopCalling = () => {
    backToPreviousScreen();
    dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
  };

  useEffect(() => {
    if (callingSound && missedSound) {
      const playCallingSound = () => {
        callingSound.play();
      };
      const playMissedSound = () => {
        missedSound.play();
      };

      playCallingSound();

      callingSound.addEventListener("ended", playCallingSound);

      const timer = setTimeout(() => {
        callingSound.pause();
        callingSound.currentTime = 0;
        callingSound.removeEventListener("ended", playCallingSound);

        playMissedSound();
      }, 12000);

      const endCalling = setTimeout(() => {
        stopCalling();
      }, 14000);

      return () => {
        clearTimeout(timer);
        clearTimeout(endCalling);
        callingSound.pause();
        callingSound.currentTime = 0;
        callingSound.removeEventListener("ended", playCallingSound);
        missedSound.pause();
        missedSound.currentTime = 0;
      };
    }
  }, [callingSound, missedSound]);

  return (
    <StyledBody $bg={gradient}>
      <StyledDescriptiopnTop>Łączenie...</StyledDescriptiopnTop>
      <StyledTitle>
        {title === callingNumber ? editContactNumber(callingNumber) : title}
      </StyledTitle>
      {title !== callingNumber && (
        <StyledDescriptiopn>
          Numer {editContactNumber(callingNumber)}
        </StyledDescriptiopn>
      )}

      <StyledBtn
        onClick={() => {
          stopCalling();
        }}
      >
        <CallEndIcon fontSize="large" />
      </StyledBtn>
    </StyledBody>
  );
}

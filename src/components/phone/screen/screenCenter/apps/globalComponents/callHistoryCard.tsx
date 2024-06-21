import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../../../../../redux/hooks";
import { useState, useEffect } from "react";

import CallIcon from "@mui/icons-material/Call";
import SmsIcon from "@mui/icons-material/Sms";
import InfoIcon from "@mui/icons-material/Info";

import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback"; // od kogos odebrany
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed"; // od kogos nie odebrany
import PhonePausedIcon from "@mui/icons-material/PhonePaused"; // od kogos odrzucony
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded"; // ja do kogos na kazdy mozliwy sposob

import {
  unixToPolishTime,
  generateRandomGradient,
  findContactName,
  mapCallsByDay,
  arrHistory,
} from "../elements/arrays";

import HiddenElement from "./HiddenElement";
import useSound from "../../../../../../customHooks/useSound";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledBody = styled.div<{ $large: boolean }>`
  background: ${(prop) => prop.theme.colors.background};
  height: ${(p) => (p.$large ? "132px" : "60px")};
  padding-left: 6px;
  margin-top: 5px;
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
`;

const StyledInfoBar = styled.button`
  background: ${(prop) => prop.theme.colors.background};
  border: none;
  border-radius: 18px;
  width: 100%;
  height: 45px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const StyledIcon = styled.div<{ $iCalled: boolean }>`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  color: ${(prop) =>
    prop.$iCalled ? prop.theme.colors.primary : prop.theme.declain};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPhoto = styled.div<{ $gradient: string }>`
  border-radius: 50%;
  background: ${(prop) => prop.$gradient};
  height: 40px;
  width: 40px;
  color: ${(prop) => prop.theme.colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.4s forwards;
`;

const StyledTxtArea = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledName = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 0.8rem;
`;

const StyledTime = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
`;

type Props = {
  callObj: any;
  fnToDo: () => void;
  selected: boolean;
};

export default function CallHistoryCardBtn({
  callObj,
  fnToDo,
  selected,
}: Props) {
  const [gradient, setGradient] = useState("");
  const myNumber = useAppSelector((state) => state.user.phoneNumber);
  const { btnSoundEffect } = useSound();

  const { callerNumber, calledTo } = callObj;
  const iCalled = myNumber === callerNumber;

  useEffect(() => {
    const newGradient = generateRandomGradient();
    setGradient(newGradient);
  }, []);

  return (
    <StyledBody $large={selected}>
      <StyledInfoBar onMouseDown={() => btnSoundEffect()} onClick={fnToDo}>
        <StyledIcon $iCalled={iCalled}>
          {iCalled ? (
            <PhoneForwardedIcon fontSize="small" />
          ) : (
            <PhoneMissedIcon fontSize="small" />
          )}
        </StyledIcon>
        <StyledTxtArea>
          <StyledName>
            {findContactName(iCalled ? calledTo : callerNumber).name}
          </StyledName>

          {selected ? (
            <StyledPhoto $gradient={gradient}>N</StyledPhoto>
          ) : (
            <StyledTime>{unixToPolishTime(callObj.unixTime)}</StyledTime>
          )}
        </StyledTxtArea>
      </StyledInfoBar>

      {selected && (
        <HiddenElement phoneNumber={iCalled ? calledTo : callerNumber} />
      )}
    </StyledBody>
  );
}

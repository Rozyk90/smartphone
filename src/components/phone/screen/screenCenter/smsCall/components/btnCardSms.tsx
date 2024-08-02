import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";

import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { smsOpenWith } from "../../../../../../redux/reducers/sms";

import useScreen from "../../../../../../customHooks/useScreen";
import useUtilities from "../../../../../../customHooks/useUtilities";
import useContacts from "../../../../../../customHooks/useContacts";
import useDate from "../../../../../../customHooks/useDate";
import useSound from "../../../../../../customHooks/useSound";

const StyledBody = styled.button`
  background: ${(prop) => prop.theme.colors.background};
  border: none;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

const StyledIconArea = styled.div`
  width: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div<{ $bg: string }>`
  background: ${(prop) => prop.$bg};
  border-radius: 50%;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTxtArea = styled.div`
  width: 100%;
  max-width: 150px;
  text-align: left;
`;

const StyledTitle = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledMessage = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 0.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledTimeArea = styled.div`
  width: 40px;
  min-width: 40px;
  text-align: center;
  font-size: 0.8rem;
  color: ${(prop) => prop.theme.fonts.primary};
`;

type Prop = {
  number: string;
  lastMessage: { txt: string; unixtime: number };
};

export default function BtnCardSms({ number, lastMessage }: Prop) {
  const { generateRandomGradient } = useUtilities();
  const { btnSoundEffect } = useSound();
  const { findContactName } = useContacts();
  const { pushCurrentScreen } = useScreen();

  const { getIsToday, getPolishTime } = useDate();
  const [gradient] = useState(generateRandomGradient());

  const dispatch = useAppDispatch();

  const openConversation = () => {
    dispatch(smsOpenWith(number));
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.conversation));
  };

  const timeObj = getPolishTime(lastMessage.unixtime);
  const time = () => {
    return getIsToday(lastMessage.unixtime)
      ? `${timeObj.hours}:${timeObj.minutes}`
      : `${timeObj.dayOfMonth} ${timeObj.monthName.substring(0, 3)}`;
  };

  return (
    <StyledBody
      onClick={() => {
        openConversation();
      }}
      onMouseDown={() => btnSoundEffect()}
    >
      <StyledIconArea>
        <StyledIcon $bg={gradient}>K</StyledIcon>
      </StyledIconArea>
      <StyledTxtArea>
        <StyledTitle>{findContactName(number)}</StyledTitle>
        <StyledMessage>{lastMessage.txt}</StyledMessage>
      </StyledTxtArea>
      <StyledTimeArea>{time()}</StyledTimeArea>
    </StyledBody>
  );
}

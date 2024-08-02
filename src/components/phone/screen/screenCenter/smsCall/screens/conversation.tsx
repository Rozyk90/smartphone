import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import useContacts from "../../../../../../customHooks/useContacts";
import TitleWithBack from "../../../../../../globalComponents/titleWithBack";
import SendIcon from "@mui/icons-material/Send";
import KeyboardQWERTY from "../../../../../../globalComponents/keyboardQWERTY";
import useDate from "../../../../../../customHooks/useDate";
import { smsPushMessage } from "../../../../../../redux/reducers/sms";
import useFirestorePush from "../../../../../../customHooks/useFirestorePush";
import useUtilities from "../../../../../../customHooks/useUtilities";
import { BtnInfo, BtnCall } from "../components/btnsSmall";
import { smsSetNotification } from "../../../../../../redux/reducers/sms";

const StyledBody = styled.div<{ $keyboard: boolean }>`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: ${(prop) => (prop.$keyboard ? "280px" : "480px")};
  position: relative;
  top: 50px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledTopBar = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 45px;
  width: 310px;
  height: 50px;
`;

const StyledBarBtns = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledMessegesArea = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-top: 20px;
`;

const StyledDay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledMessage = styled.div`
  padding: 8px 16px;
  margin-left: 10px;
  font-size: 1rem;
  border-radius: 18px;
  min-height: 24px;
  background: ${(prop) => prop.theme.backgrounds.medium};
  color: ${(prop) => prop.theme.fonts.primary};
  width: 70%;
`;

const StyledMyMessage = styled.div`
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 18px;
  min-height: 24px;
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.fonts.primary};
  width: 70%;
  margin-left: 50px;
`;

const StyledDateElement = styled.div`
  height: 15px;
  margin-top: 20px;
  margin-bottom: 5px;
  text-align: center;
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 0.8rem;
  font-weight: bold;
`;

const StyledLastMessageTime = styled.div<{ $myMessage: boolean }>`
  padding: 0px 30px;
  display: flex;
  justify-content: ${(prop) => (prop.$myMessage ? "right" : "left")};
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 0.8rem;
`;

const StyledInputArea = styled.div<{ $keyboard: boolean }>`
  width: 310px;
  height: 65px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: ${(prop) => (prop.$keyboard ? "250px" : "50px")};
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledKeyboardArea = styled.div`
  padding-bottom: 10px;
  width: 310px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 40px;
  background: ${(props) => props.theme.backgrounds.primary};
`;

const StyledInput = styled.input`
  border: none;
  background: ${(prop) => prop.theme.backgrounds.light};
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 30px;
  outline: none;
  min-height: 24px;
  color: ${(prop) => prop.theme.fonts.primary};
  cursor: pointer;
`;

const StyledSendBtn = styled.button<{ $active: boolean }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: none;
  background: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  cursor: ${(prop) => (prop.$active ? "pointer" : "default")};
  transition: 1s;
  && {
    color: ${(prop) =>
      prop.$active ? prop.theme.colors.primary : prop.theme.off};
  }
`;

export default function Conversation() {
  const [message, setMessage] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const { phoneNumber, uid } = useAppSelector((state) => state.user);
  const { smsTo, smsHistory } = useAppSelector((state) => state.sms);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { firestorePushSendSmsTo } = useFirestorePush();

  const { getUnixTime, getIsToday, getPolishTime } = useDate();
  const { mapMessagesByDay } = useUtilities();

  const { findContactName, editContactNumber, findeContactUid } = useContacts();

  const dispatch = useAppDispatch();
  const isContact = findContactName(smsTo);
  const conversationObj = smsHistory.find((conv) => conv.smsToNumber === smsTo);
  const sortedMessages = conversationObj?.conversation
    ? mapMessagesByDay(conversationObj.conversation)
    : [];

  const handleInputChange = (event: any): void => {
    dispatch(smsSetNotification(false));
    setMessage(event.target.value);
    setShowKeyboard(true);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && message.length !== 0) {
      send();
    } else if (event.key === "Backspace" && message.length === 0) {
      setShowKeyboard(false);
    }
  };

  const send = async () => {
    if (message) {
      setMessage("");
      const smsToUid = await findeContactUid(smsTo);

      const messageObj = {
        elementId: getUnixTime(),
        smsToNumber: smsTo,
        smsToUid,
        message: {
          unixtime: getUnixTime(),
          unixtimeId: getUnixTime(),
          authorNumber: phoneNumber,
          txt: message,
        },
      };

      await dispatch(smsPushMessage(messageObj));

      if (smsToUid) {
        const messageToSend = {
          elementId: getUnixTime(),
          smsToNumber: phoneNumber,
          smsToUid: uid,
          message: {
            unixtime: getUnixTime(),
            unixtimeId: getUnixTime(),
            authorNumber: phoneNumber,
            txt: message,
          },
        };

        firestorePushSendSmsTo(smsToUid, messageToSend);
      }

      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    }
  };

  const createTimeNotification = (unixtime: number) => {
    const time = getPolishTime(unixtime);
    if (getIsToday(unixtime)) {
      return `${time.hours}:${time.minutes}`;
    } else {
      return ` ${time.dayName}, ${time.dayOfMonth} ${time.monthName} ${time.hours}:${time.minutes}`;
    }
  };

  const messageTime = (unixtime: number) => {
    const time = getPolishTime(unixtime);
    return `${time.hours}:${time.minutes}`;
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [showKeyboard]);

  return (
    <StyledBody ref={bodyRef} $keyboard={showKeyboard}>
      <StyledTopBar>
        <TitleWithBack
          title={isContact !== smsTo ? isContact : editContactNumber(smsTo)}
        />
        <StyledBarBtns>
          <BtnCall number={smsTo} />
          <BtnInfo number={smsTo} />
        </StyledBarBtns>
      </StyledTopBar>

      <StyledMessegesArea>
        {sortedMessages
          .sort((a, b) => a[0].unixtime - b[0].unixtime)
          .map((dayArr, dayId) => {
            return (
              <StyledDay key={dayArr[0].unixtime}>
                {dayArr
                  .sort((a, b) => a.unixtime - b.unixtime)

                  .map((message, messageId) => {
                    return (
                      <React.Fragment key={message.unixtimeId}>
                        {messageId === 0 && (
                          <StyledDateElement key={`date-${message.unixtimeId}`}>
                            {createTimeNotification(message.unixtime)}
                          </StyledDateElement>
                        )}

                        {phoneNumber === message.authorNumber ? (
                          <StyledMyMessage
                            key={`myMessage-${message.unixtimeId}`}
                          >
                            {message.txt}
                          </StyledMyMessage>
                        ) : (
                          <StyledMessage key={`message-${message.unixtimeId}`}>
                            {message.txt}
                          </StyledMessage>
                        )}

                        {sortedMessages.length - 1 === dayId &&
                          dayArr.length - 1 === messageId && (
                            <StyledLastMessageTime
                              key={`lastMessage-${message.unixtimeId}`}
                              $myMessage={phoneNumber === message.authorNumber}
                            >
                              {messageTime(dayArr[dayArr.length - 1].unixtime)}
                            </StyledLastMessageTime>
                          )}
                      </React.Fragment>
                    );
                  })}
              </StyledDay>
            );
          })}
      </StyledMessegesArea>

      <StyledInputArea $keyboard={showKeyboard}>
        <StyledInput
          autoComplete="off"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="SMS"
          value={message}
          onFocus={() => {
            setShowKeyboard(true);
            dispatch(smsSetNotification(false));
          }}
        />
        <StyledSendBtn $active={message !== ""} onClick={() => send()}>
          <SendIcon />
        </StyledSendBtn>
      </StyledInputArea>

      <StyledKeyboardArea>
        {(showKeyboard || message) && (
          <KeyboardQWERTY
            setTxt={setMessage}
            txt={message}
            closeKeyboard={() => setShowKeyboard(false)}
          />
        )}
      </StyledKeyboardArea>
    </StyledBody>
  );
}

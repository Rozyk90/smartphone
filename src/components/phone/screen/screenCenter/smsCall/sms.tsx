import styled from "styled-components";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import AddCommentIcon from "@mui/icons-material/AddComment";
import BtnCardSms from "./components/btnCardSms";
import TitleLarge from "../../../../../globalComponents/titleLarge";

import useSound from "../../../../../customHooks/useSound";
import useScreen from "../../../../../customHooks/useScreen";
import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../redux/reducers/screenParts/enumsScreen";
import { smsSetNotification } from "../../../../../redux/reducers/sms";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0px 10px;
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

const StyledAddArea = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledAddBtn = styled(AddCommentIcon)`
  color: ${(prop) => prop.theme.colors.primary};
  cursor: pointer;
  margin-right: 20px;
  && {
    height: 30px;
    width: 30px;
  }
`;

export default function Sms() {
  const { smsHistory } = useAppSelector((state) => state.sms);
  const dispatch = useAppDispatch();

  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();

  const openContacts = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.newConversation));
  };

  const sortSmsHistory = () => {
    return smsHistory.slice().sort((a, b) => {
      const lastMessageTimeA =
        a.conversation[a.conversation.length - 1].unixtime;
      const lastMessageTimeB =
        b.conversation[b.conversation.length - 1].unixtime;
      return lastMessageTimeB - lastMessageTimeA;
    });
  };

  const sortedHistory = sortSmsHistory();

  useEffect(() => {
    dispatch(smsSetNotification(false));
    return () => {
      dispatch(smsSetNotification(false));
    };
  }, []);

  return (
    <StyledBody>
      <TitleLarge title="Wiadomości" description={null} />
      <StyledAddArea>
        <StyledAddBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => openContacts()}
        />
      </StyledAddArea>

      {sortedHistory.map((conv) => {
        const lastMessage = conv.conversation[conv.conversation.length - 1];
        return (
          <BtnCardSms
            key={conv.elementId}
            number={conv.smsToNumber}
            lastMessage={{
              txt: lastMessage.txt,
              unixtime: lastMessage.unixtime,
            }}
          />
        );
      })}
    </StyledBody>
  );
}

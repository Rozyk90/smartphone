import styled from "styled-components";

import AddCommentIcon from "@mui/icons-material/AddComment";
import BtnCardSms from "./components/btnCardSms";
import TitleLarge from "../../../../../../globalComponents/titleLarge";

import useSound from "../../../../../../customHooks/useSound";

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



type Message = {
  unixtime: number; 
  unixtimeId: number; 
  authorNumber: string; 
}

type Conversation = {
  elementId: number; 
  smsToNumber: string; 
  smsId: string; 
  smsHistory: Message[]; 
};




export default function Sms() {
  const { btnSoundEffect } = useSound();

  return (
    <StyledBody>
      <TitleLarge title="Wiadomości" description={null} />
      <StyledAddArea>
        <StyledAddBtn
          onMouseDown={() => btnSoundEffect()}
          // onClick={() => createEmptyContact()}
        />
      </StyledAddArea>



<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>
<BtnCardSms/>





    </StyledBody>
  );
}

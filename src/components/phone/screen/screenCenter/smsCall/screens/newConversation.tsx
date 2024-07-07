import styled from "styled-components";
import { useState } from "react";

import KeyboardNumbers from "../../../../../../globalComponents/keyboardNumbers";
import TitleWithBack from "../../../../../../globalComponents/titleWithBack";
import { TextField } from "@mui/material";
import useContacts from "../../../../../../customHooks/useContacts";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ContactCard from "../components/contactCard";
import { smsOpenWith } from "../../../../../../redux/reducers/sms";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import useSound from "../../../../../../customHooks/useSound";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";



const StyledBody = styled.div<{ $keyboard: boolean }>`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: ${(prop) => (prop.$keyboard ? "380px" : "590px")};
  padding: 10px 10px 0px 10px;
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

const StyledInputArea = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  left: 0px;
  margin-top: 20px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledInput = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      &.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${(prop) => prop.theme.colors.primary};
      }
      .MuiOutlinedInput-notchedOutline {
        border-color: ${(prop) => prop.theme.colors.primary};
      }
    }
    .MuiInputLabel-root {
      color: ${(prop) => prop.theme.colors.primary};
      &.Mui-focused {
        color: ${(prop) => prop.theme.colors.primary};
      }
    }
  }
`;

const StyledStartNewBtn = styled.button<{ $number: boolean }>`
  border-radius: 50%;
  border: none;
  background: none;
  cursor: ${(prop) => (prop.$number ? "pointer" : "default")};
  && {
    color: ${(props) =>
      props.$number ? props.theme.colors.primary : props.theme.off};
    transition: 0.5s;
  }
`;

const StyledContacts = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledKeyboardArea = styled.div`
  padding-bottom: 10px;
  width: 310px;
  position: absolute;
  bottom: 28px;
  left: 0px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

export default function NewConversation() {
  const [number, setNumber] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const { contactsList } = useAppSelector((state) => state.contacts.list);
  const { editContactNumber } = useContacts();
  const dispatch = useAppDispatch();

  const openConversation = (number: string) => {
    if (number.length===9) {
      dispatch(smsOpenWith(number));
      dispatch(setCurrentScreen(enumCurrentScreen.conversation));
    }
  };

  const handleInputChangeNumber = (event: any): void => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const newKey = event.key

    if (newKey === "Backspace") {
      setNumber((prevNumber) => prevNumber.slice(0, -1));
    } else if (number.length < 9 && numbers.includes(newKey)) {
      setNumber((prevNumber) => prevNumber + newKey);
    }
  };

  return (
    <StyledBody $keyboard={showKeyboard}>
      <TitleWithBack title="Nowa rozmowa" />
      <StyledInputArea>

<StyledInput
          onFocus={() => setShowKeyboard(true)}
          onKeyDown={handleInputChangeNumber}
          label="Numer"
          autoComplete="off" 
          value={editContactNumber(number)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneRoundedIcon />
              </InputAdornment>
            ),
          }}
        />



        <StyledStartNewBtn
          $number={number.length === 9}
          onClick={() => openConversation(number)}
        >
          <AddCommentIcon fontSize="large" />
        </StyledStartNewBtn>
      </StyledInputArea>

      <StyledContacts>
        {contactsList.map((contact) => (
          <ContactCard
            key={contact.elementId}
            contact={contact}
            fnToDo={() => openConversation(contact.number)}
            selected={false} // ================================================== only false
          />
        ))}
      </StyledContacts>

      <StyledKeyboardArea>
        {(showKeyboard || number) && (
          <KeyboardNumbers setNumber={setNumber} number={number} closeKeyboard={()=>setShowKeyboard(false)} />
        )}
      </StyledKeyboardArea>
    </StyledBody>
  );
}

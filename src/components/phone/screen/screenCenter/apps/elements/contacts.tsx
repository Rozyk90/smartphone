import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ContactCardBtn from "../globalComponents/contactCard";
import ContactTitle from "../globalComponents/contactTitle";
import { arrContacts } from "./arrays";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { setContactToEdit } from "../../../../../../redux/reducers/contacts";
import useSound from "../../../../../../customHooks/useSound";
import useScreen from "../../../../../../customHooks/useScreen";

const StyledBody = styled.div``;

const StyledAddArea = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledAddBtn = styled(AddIcon)`
  color: ${(prop) => prop.theme.colors.primary};
  cursor: pointer;
  border-radius: 50%;
  margin-right: 20px;
`;

const StyledListArea = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState<string>("");
  const { phoneNumber } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const {pushCurrentScreen} = useScreen()

  const selectContact = (number: string) => {
    if (selectedContact === number) {
      setSelectedContact("");
    } else {
      setSelectedContact(number);
    }
  };

  const editContact = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.newContact));
    dispatch(setContactToEdit({ name: "brak", number: "brak" }));
    pushCurrentScreen()
  };

  return (
    <StyledBody>
      <ContactTitle
        title={"Kontakty"}
        description={`Mój numer: ${phoneNumber}`}
      />
      <StyledAddArea>
        <StyledAddBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => editContact()}
        />
      </StyledAddArea>
      <StyledListArea>
        {arrContacts.map((contact) => (
          <ContactCardBtn
            key={contact.number}
            name={contact.name}
            number={contact.number}
            fnToDo={() => selectContact(contact.number)}
            selected={selectedContact === contact.number}
          />
        ))}
      </StyledListArea>
    </StyledBody>
  );
}

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { useId, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ContactCard from "../components/contactCard";
import TitleLarge from "../../../../../../globalComponents/titleLarge";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import useSound from "../../../../../../customHooks/useSound";
import useScreen from "../../../../../../customHooks/useScreen";
import {
  contactActionTypeSet,
  contactNewContactData
} from "../../../../../../redux/reducers/contacts/contactsGeneral";
import useDate from "../../../../../../customHooks/useDate";
import useContacts from "../../../../../../customHooks/useContacts";

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

export default function ContactsList() {
  const [selectedContact, setSelectedContact] = useState<string>("");
  const { phoneNumber } = useAppSelector((state) => state.user);
  const { contactsList } = useAppSelector((state) => state.contacts.list);

  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();
  const {getUnixTime} = useDate()
  const {editContactNumber} = useContacts()

  const selectContact = (number: string) => {
    if (selectedContact === number) {
      setSelectedContact("");
    } else {
      setSelectedContact(number);
    }
  };

  const createEmptyContact = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.newContact));
    dispatch(contactActionTypeSet("addNew"));
    dispatch(
      contactNewContactData({ name: "", number: "", uid: null, elementId: getUnixTime() })
    );
    pushCurrentScreen();
  };

  return (
    <StyledBody>
      <TitleLarge
        title={"Kontakty"}
        description={`Mój numer: ${editContactNumber(phoneNumber)}`}
      />
      <StyledAddArea>
        <StyledAddBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => createEmptyContact()}
        />
      </StyledAddArea>
      <StyledListArea>
        {contactsList.map((contact) => (
          <ContactCard
            key={contact.elementId}
            contact={contact}
            fnToDo={() => selectContact(contact.number)}
            selected={selectedContact === contact.number}
          />
        ))}
      </StyledListArea>
    </StyledBody>
  );
}

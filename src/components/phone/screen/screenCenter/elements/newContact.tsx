import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import KeyboardNumbers from "../../../../../globalComponents/keyboardNumbers";
import KeyboardQWERTY from "../../../../../globalComponents/keyboardQWERTY";

import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../redux/reducers/screenParts/enumsScreen";
import {
  contactsListAddNew,
  contactsListUpdate,
} from "../../../../../redux/reducers/contacts/contactsList";
import useSound from "../../../../../customHooks/useSound";
import useContacts from "../../../../../customHooks/useContacts";
import useUtilities from "../../../../../customHooks/useUtilities";

const StyledBody = styled.div`
  height: 100%;
`;

const StyledPhotoArea = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPhoto = styled.div<{ $gradient: string }>`
  background: ${(prop) => prop.$gradient};
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${(prop) => prop.theme.white};
  font-size: 2.5rem;
`;

const StyledInputsArea = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 200px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const StyledButtonsArea = styled.div`
  height: 50px;
  padding: 0px 20px;
  background: ${(prop) => prop.theme.backgrounds.primary};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledBtn = styled.button<{ $off: boolean }>`
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: bolder;
  color: ${(prop) => (prop.$off ? prop.theme.off : prop.theme.colors.primary)};
  cursor: ${(prop) => (prop.$off ? "auto" : "pointer")};
`;

enum Keyboards {
  qwerty = "QWERTY",
  numbers = "numbers",
}

export default function NewContact() {
  const { generateRandomGradient } = useUtilities();
  
  const [keyboardType, setKeyboardType] = useState<
    Keyboards.qwerty | Keyboards.numbers
  >(Keyboards.qwerty);
  const [gradient] = useState(generateRandomGradient());
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [elementId, setElementId] = useState(0);
  const [uid, setUid] = useState<string | null>(null);

  const { newContactData, contactActionType } = useAppSelector(
    (state) => state.contacts.general
  );

  const dispatch = useAppDispatch();

  const { btnSoundEffect } = useSound();
  const { editContactNumber, findeContactUid } = useContacts();

  const addNewContact = async () => {
    if (name.length !== 0 && number.length === 9) {
      try {
        const firestoreUid = await findeContactUid(number);
        dispatch(
          contactsListAddNew({ name, number, uid: firestoreUid, elementId })
        );
        dispatch(setCurrentScreen(enumCurrentScreen.appContacts));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const updateContact = () => {
    dispatch(contactsListUpdate({ name, number, uid, elementId }));
    dispatch(setCurrentScreen(enumCurrentScreen.appContacts));
  };

  useEffect(() => {
    const { name, number, uid, elementId } = newContactData;
    if (name) {
      setName(name);
    }
    if (number) {
      setNumber(number);
    }
    if (uid) {
      setUid(uid);
    }
    if (elementId) {
      setElementId(elementId);
    }
  }, []);

  return (
    <StyledBody>
      <StyledPhotoArea>
        <StyledPhoto $gradient={gradient}>{name[0]}</StyledPhoto>
      </StyledPhotoArea>

      <StyledInputsArea>
        <StyledInput
          onClick={() => setKeyboardType(Keyboards.qwerty)}
          label="Nazwa"
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonAddAlt1RoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledInput
          onClick={() => setKeyboardType(Keyboards.numbers)}
          label="Numer"
          value={editContactNumber(number)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
      </StyledInputsArea>
      <StyledButtonsArea>
        <StyledBtn
          $off={false}
          onMouseDown={() => btnSoundEffect()}
          onClick={() =>
            dispatch(setCurrentScreen(enumCurrentScreen.appContacts))
          }
        >
          Anuluj
        </StyledBtn>
        <StyledBtn
          $off={name.length === 0 || number.length < 9}
          onClick={() =>
            contactActionType === "addNew" ? addNewContact() : updateContact()
          }
          onMouseDown={() => btnSoundEffect()}
        >
          Zapisz
        </StyledBtn>
      </StyledButtonsArea>

      {keyboardType === Keyboards.qwerty && (
        <KeyboardQWERTY setTxt={setName} txt={name} />
      )}
      {keyboardType === Keyboards.numbers && (
        <KeyboardNumbers setNumber={setNumber} number={number} />
      )}
    </StyledBody>
  );
}

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { useEffect, useState } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import KeyboardNumbers from "../../../../../../globalComponents/keyboardNumbers";
import KeyboardQWERTY from "../../../../../../globalComponents/keyboardQWERTY";

import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import {
  contactsListAddNew,
  contactsListUpdate,
} from "../../../../../../redux/reducers/contacts/contactsList";
import useSound from "../../../../../../customHooks/useSound";
import useContacts from "../../../../../../customHooks/useContacts";
import useUtilities from "../../../../../../customHooks/useUtilities";
import { contactNewContactData } from "../../../../../../redux/reducers/contacts/contactsGeneral";
import useScreen from "../../../../../../customHooks/useScreen";

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
      .MuiOutlinedInput-input {
        color: ${(prop) => prop.theme.fonts.primary};
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

const StyledIconName = styled(PersonAddAlt1RoundedIcon)`
  && {
    color: ${(prop) => prop.theme.fonts.primary};
  }
`;

const StyledIconNumber = styled(PhoneRoundedIcon)`
  && {
    color: ${(prop) => prop.theme.fonts.primary};
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

  const { screenCountdownUpdate } = useScreen();
  const { btnSoundEffect } = useSound();
  const { editContactNumber, findeContactUid } = useContacts();

  const addNewContact = async () => {
    if (name.length !== 0 && number.length === 9) {
      try {
        const firestoreUid = await findeContactUid(number);
        dispatch(
          contactsListAddNew({ name, number, uid: firestoreUid, elementId })
        );
        dispatch(setCurrentScreen(enumCurrentScreen.contacts));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  
  const updateContact = () => {
    dispatch(contactsListUpdate({ name, number, uid, elementId }));
    dispatch(setCurrentScreen(enumCurrentScreen.contacts));
  };

  const handleInputChange = (event: any) => {
    screenCountdownUpdate()
    setName(event.target.value);
  };

  const handleInputChangeNumber = (event: any) => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const newKey = event.key
    screenCountdownUpdate()

    if (newKey === "Backspace") {
      setNumber((prevNumber) => prevNumber.slice(0, -1));
    } else if (number.length < 9 && numbers.includes(newKey)) {
      setNumber((prevNumber) => prevNumber + newKey);
    }
  };

  useEffect(() => {
    const { name, number, uid, elementId } = newContactData;

    setName(name);
    setNumber(number);
    setUid(uid);
    setElementId(elementId);

    return () => {
      dispatch(
        contactNewContactData({ name: "", number: "", uid: null, elementId: 0 })
      );
    };
  }, []);

  return (
    <StyledBody>
      <StyledPhotoArea>
        <StyledPhoto $gradient={gradient}>{name[0]}</StyledPhoto>
      </StyledPhotoArea>

      <StyledInputsArea>
        <StyledInput
          onFocus={() => setKeyboardType(Keyboards.qwerty)}
          onChange={handleInputChange}
          label="Nazwa"
          autoComplete="off" 
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StyledIconName />
              </InputAdornment>
            ),
          }}
        />

        <StyledInput
          onFocus={() => setKeyboardType(Keyboards.numbers)}
          onKeyDown={handleInputChangeNumber}
          label="Numer"
          autoComplete="off" 
          value={editContactNumber(number)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StyledIconNumber />
              </InputAdornment>
            ),
          }}
        />
      </StyledInputsArea>
      <StyledButtonsArea>
        <StyledBtn
          $off={false}
          onMouseDown={() => btnSoundEffect()}
          onClick={() => dispatch(setCurrentScreen(enumCurrentScreen.contacts))}
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

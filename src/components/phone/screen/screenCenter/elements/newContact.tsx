import styled from "styled-components";
import { useAppSelector } from "../../../../../redux/hooks";
import { useEffect, useState } from "react";
import KeyboardNumbers from "../../../../../globalComponents/keyboardNumbers";
import KeyboardQWERTY from "../../../../../globalComponents/keyboardQWERTY";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

import {
  formatPhoneNumber,
  generateRandomGradient,
} from "../apps/elements/arrays";

const StyledBody = styled.div`
  /* background: red; */
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

const StyledBtn = styled.button`
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: bolder;
  color: ${(prop) => prop.theme.colors.primary};
  cursor: pointer;
`;

enum Keyboards {
  qwerty = "QWERTY",
  numbers = "numbers",
}

export default function NewContact() {
  const [gradient, setGradient] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [keyboardType, setKeyboardType] = useState<
    Keyboards.qwerty | Keyboards.numbers
  >(Keyboards.qwerty);
  const { contactToEdit } = useAppSelector((state) => state.contacts);


  useEffect(() => {
    setGradient(generateRandomGradient());
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
          value={formatPhoneNumber(number)}
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
        <StyledBtn>Anuluj</StyledBtn>
        <StyledBtn>Zapisz</StyledBtn>
      </StyledButtonsArea>

      {keyboardType === Keyboards.qwerty && <KeyboardQWERTY setTxt={setName} txt={name} />}
      {keyboardType === Keyboards.numbers && (
        <KeyboardNumbers setNumber={setNumber} number={number} />
      )}
    </StyledBody>
  );
}

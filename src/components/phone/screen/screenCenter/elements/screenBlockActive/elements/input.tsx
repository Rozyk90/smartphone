import styled from "styled-components";
import TextField from "@mui/material/TextField";

const StyledInputBox = styled.div`
  padding-top: 30px;
  height: 80px;
`;

const StyledInput = styled(TextField)`
  && {
    color: white; // Kolor tekstu
    & label.Mui-focused {
      color: white; // Kolor napisu po kliknięciu
    }
    & .MuiOutlinedInput-root {
      & fieldset {
        border: 2px solid white; // Kolor ramki
      }
      &:hover fieldset {
        border: 2px solid white; // Kolor ramki po najechaniu myszką
      }
      &.Mui-focused fieldset {
        border: 2px solid white; // Kolor ramki po kliknięciu
      }
      &.Mui-error fieldset {
        border: 2px solid white; // Kolor ramki z błędem
      }
      & input {
        color: white; // Kolor wprowadzanego tekstu
        &::placeholder {
          color: white; // Kolor tekstu zastępczego
        }
      }
      & + .MuiFormHelperText-root {
        color: white; // Kolor tekstu z błędem
      }
    }
  }
`;

const StyledLabel = styled.div`
  color: white;
  font-size: large;
`;

interface InputProps {
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  label: string;
}

export default function Input({ value, change, error, label }: InputProps) {
  return (
    <StyledInputBox>
      <StyledLabel>{label}</StyledLabel>
      <p></p>
      <StyledInput
        id="outlined-basic"
        {...(label === "hasło" ? { type: "password" } : {})}
        variant="outlined"
        size="small"
        value={value}
        onChange={change}
        helperText={error}
      />
    </StyledInputBox>
  );
}

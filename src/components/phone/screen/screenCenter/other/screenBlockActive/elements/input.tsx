import styled from "styled-components";
import TextField from "@mui/material/TextField";

const StyledInputBox = styled.div`
  height: 80px;
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
      <TextField
        id={label}
        label={label}
        variant="outlined"
        color="primary"
        autoComplete="off"
        {...(label === "hasło" ? { type: "password" } : {})}
        value={value}
        onChange={change}
        error={error !== ""}
        helperText={error}
      />
    </StyledInputBox>
  );
}

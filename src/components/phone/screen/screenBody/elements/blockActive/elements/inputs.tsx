import React, { useEffect } from "react";
import { useState } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";
import styled from "styled-components";
import { auth } from "../../../../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { updateScreenCountDown } from "../../../../../../../redux/reducers/screen";

const StyledInputs = styled.div`
  border: 2px solid green;
`;

const StyledInput = styled(TextField)`
  && {
    margin-top: 50px;
  }
`;
export default function Inputs() {
  enum enumBtns {
    btnLogin = "login",
    btnRegistration = "registration",
  }

  const [selectedBtn, setSelectedBtn] = useState(enumBtns.btnLogin);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  const shortTime = useAppSelector((state) => state.screen.countDownTimerShort);
  const dispatch = useAppDispatch();

  const resetScreenTimer = () => {
    dispatch(updateScreenCountDown(shortTime));
  };

  const setBtn = (
    event: React.MouseEvent<HTMLElement>,
    newBtn: enumBtns.btnLogin | enumBtns.btnRegistration
  ) => {
    resetScreenTimer();
    if (newBtn !== null) {
      resetErrors();
      setSelectedBtn(newBtn);
    }
  };

  const changeEmail = (event: any) => {
    resetErrors();
    resetScreenTimer();
    setEmail(event.target.value);
  };

  const changePass = (event: any) => {
    resetErrors();
    resetScreenTimer();
    setPass(event.target.value);
  };

  const resetErrors = () => {
    setPassError(enumErrors.clear);
    setEmailError(enumErrors.clear);
  };

  enum enumErrorsCodes {
    emailExists = "auth/email-already-in-use",
    emailWrong = "auth/invalid-email",
    missingPass = "auth/missing-password",
  }

  enum enumErrors {
    clear = "",
    wrongEmail = "Wprowadz poprawny email",
    existsEmail = "Podany email jest już używany",
    wrongPass = "Wymagana długość to 6 znaków",
    serverError = "Błąd serwera",
    correctDetails = "Wprowadz poprawne dane",
  }

  const loginAcc = async () => {
    resetScreenTimer();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        resetErrors();
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setEmailError(enumErrors.correctDetails);
        setPassError(enumErrors.correctDetails);
      });
  };

  const createAcc = async () => {
    resetScreenTimer();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        resetErrors();
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === enumErrorsCodes.emailExists) {
          setEmailError(enumErrors.existsEmail);
        } else if (errorCode === enumErrorsCodes.emailWrong) {
          setEmailError(enumErrors.wrongEmail);
        } else if (errorCode === enumErrorsCodes.missingPass) {
          setPassError(enumErrors.wrongPass);
        } else {
          setEmailError(enumErrors.serverError);
          setPassError(enumErrors.serverError);
        }
      });
  };

  return (
    <>
      <ToggleButtonGroup value={selectedBtn} exclusive onChange={setBtn}>
        <ToggleButton color="error" value={enumBtns.btnLogin}>
          Logowanie
        </ToggleButton>
        <ToggleButton value={enumBtns.btnRegistration}>
          Rejestracja
        </ToggleButton>
      </ToggleButtonGroup>
      <StyledInputs>
        <StyledInput
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          color="primary"
          value={email}
          onChange={changeEmail}
          helperText={emailError}
        />

        <StyledInput
          label="Hasło"
          variant="outlined"
          size="small"
          color="primary"
          value={pass}
          onChange={changePass}
          helperText={passError}
        />
      </StyledInputs>

      {selectedBtn === enumBtns.btnLogin ? (
        <Button
          onClick={() => {
            loginAcc();
          }}
        >
          Zaloguj
        </Button>
      ) : (
        <Button
          onClick={() => {
            createAcc();
          }}
        >
          Stwórz
        </Button>
      )}
    </>
  );
}

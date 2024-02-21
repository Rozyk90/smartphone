import React, { useEffect } from "react";
import { useState } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../../redux/hooks";
import styled, { withTheme } from "styled-components";
import { auth } from "../../../../../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { updateScreenCountDown } from "../../../../../../../../redux/reducers/screen";

import Input from "./elements/input";
import ActionBtn from "./elements/actionBtn";

const StyledInputs = styled.div``;

const StyledBtnsGroup = styled(ToggleButtonGroup)``;

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

enum enumBtns {
  btnLogin = "login",
  btnRegistration = "registration",
}

export default function Inputs() {
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
      <StyledBtnsGroup
        color="primary"
        value={selectedBtn}
        exclusive
        onChange={setBtn}
      >
        <ToggleButton value={enumBtns.btnLogin} sx={{ color: "white" }}>
          Logowanie
        </ToggleButton>
        <ToggleButton value={enumBtns.btnRegistration} sx={{ color: "white" }}>
          Rejestracja
        </ToggleButton>
      </StyledBtnsGroup>
      <StyledInputs>
        <Input
          value={email}
          change={changeEmail}
          error={emailError}
          label="email"
        ></Input>
        <Input
          value={pass}
          change={changePass}
          error={passError}
          label="hasło"
        ></Input>
      </StyledInputs>

      <ActionBtn
        isLogin={selectedBtn === enumBtns.btnLogin}
        fn={selectedBtn === enumBtns.btnLogin ? loginAcc : createAcc}
      ></ActionBtn>
    </>
  );
}

import React, { useState } from "react";
import styled from "styled-components";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";
import { auth } from "../../../../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../../../../firebase";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Input from "./input";
import ActionBtn from "./actionBtn";
import { enumErrors, enumErrorsCodes, enumBtns } from "./enumsInput";

import {
  enumCurrentBarBottom,
  enumCurrentScreen,
  setCurrentBarBottom,
  setCurrentScreen,
  updateScreenCountDown,
} from "../../../../../../../redux/reducers/screen";

const StyledInputs = styled.div``;
const StyledBtnsGroup = styled(ToggleButtonGroup)``;

export default function Inputs() {
  const [selectedBtn, setSelectedBtn] = useState(enumBtns.btnLogin);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  const shortTime = useAppSelector((state) => state.screen.countDownTimerShort);
  const screenGrid = useAppSelector((state) => state.screen.screenGrid);
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

  const editScreen = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.on));
  };

  const loginAcc = async () => {
    resetScreenTimer();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        resetErrors();
        editScreen();
      })
      .catch((error) => {
        setEmailError(enumErrors.correctDetails);
        setPassError(enumErrors.correctDetails);
      });
  };

  const createFirestore = async (user: any) => {
    const uid = user.uid;
    const email = user.email;

    try {
      const userDocRef = doc(db, "users", uid);

      const create = await setDoc(userDocRef, {
        uid,
        email,
        screenGrid,
      });
    } catch (e) {
      console.error("Błąd podczas dodawania dokumentu: ", e);
    }
  };

  const createAcc = async () => {
    resetScreenTimer();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        createFirestore(userCredential.user);
        resetErrors();
        editScreen();
      })
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
        txt={
          selectedBtn === enumBtns.btnLogin ? "Zaloguj się" : "Zarejestruj się"
        }
        fn={selectedBtn === enumBtns.btnLogin ? loginAcc : createAcc}
      ></ActionBtn>
    </>
  );
}

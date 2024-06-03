import React, { useState } from "react";
import styled from "styled-components";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";

import { auth,db } from "../../../../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  enumCurrentBarBottom,
  enumCurrentScreen,
} from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../../../../redux/reducers/screenParts/screenBarBottom";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { countDownUpdateTime } from "../../../../../../../redux/reducers/screenParts/screenGeneral";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Input from "./input";
import ActionBtn from "./actionBtn";
import { enumErrors, enumErrorsCodes, enumBtns } from "./enumsInput";

const StyledInputs = styled.div`
  margin-bottom: 50px;
`;
const StyledBtnsGroup = styled(ToggleButtonGroup)``;

export default function Inputs() {
  const [selectedBtn, setSelectedBtn] = useState(enumBtns.btnLogin);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  const screenGrid = useAppSelector((state) => state.screen.center.screenGrid);
  const {countDownTimerSelected} = useAppSelector(state => state.screen.general)
  const dispatch = useAppDispatch();

  const setBtn = (
    event: React.MouseEvent<HTMLElement>,
    newBtn: enumBtns.btnLogin | enumBtns.btnRegistration
  ) => {


    if (newBtn !== null) {
      resetErrors();
      setSelectedBtn(newBtn);
    }
  };

  const changeEmail = (event: any) => {
    resetErrors();


    setEmail(event.target.value);
  };

  const changePass = (event: any) => {
    resetErrors();


    setPass(event.target.value);
  };

  const resetErrors = () => {
    setPassError(enumErrors.clear);
    setEmailError(enumErrors.clear);
  };

  const editScreen = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
  };

  const loginAcc = async () => {

    dispatch(countDownUpdateTime(countDownTimerSelected));

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

    dispatch(countDownUpdateTime(countDownTimerSelected));

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

import React, { useState } from "react";
import styled from "styled-components";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";

import { auth, db } from "../../../../../../../firebase";
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
import {
  userSet,
  userSetNumber,
} from "../../../../../../../redux/reducers/user";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Input from "./input";
import ActionBtn from "./actionBtn";
import { enumErrors, enumErrorsCodes, enumBtns } from "./enumsInput";
import { phoneUnlocked } from "../../../../../../../redux/reducers/basicStates";
import useSound from "../../../../../../../customHooks/useSound";
import useFirestorePush from "../../../../../../../customHooks/useFirestorePush";

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

  const dispatch = useAppDispatch();

  const { lockSoundEffect } = useSound();
  const { firestorePush } = useFirestorePush();

  const setBtn = () => {
    resetErrors();
    setSelectedBtn(
      selectedBtn === enumBtns.btnLogin
        ? enumBtns.btnRegistration
        : enumBtns.btnLogin
    );
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
    lockSoundEffect();
    dispatch(phoneUnlocked());
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
  };
  // ================================================================

  // const loginAcc = async () => {
  //   signInWithEmailAndPassword(auth, email, pass)
  //     .then(() => {
  //       resetErrors();
  //       editScreen();
  //     })
  //     .catch((error) => {
  //       setEmailError(enumErrors.correctDetails);
  //       setPassError(enumErrors.correctDetails);
  //     });
  // };

  const loginAcc = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      resetErrors();
      editScreen();
    } catch (error) {
      setEmailError(enumErrors.correctDetails);
      setPassError(enumErrors.correctDetails);
    }
  };

  // ================================================================
  const createFirestore = (
    uid: string,
    uEmail: string | null,
    phoneNumber: string | null
  ) => {
    if (uid && uEmail) {
      const userDocRef = doc(db, "users", uid);
      setDoc(userDocRef, {
        uid,
        uEmail,
        phoneNumber,
      });
    }
  };

  // const createAcc = async () => {
  //   dispatch(phoneUnlocked());

  //   createUserWithEmailAndPassword(auth, email, pass)
  //     .then((userCredential) => {
  //       createFirestore(userCredential.user);
  //       resetErrors();
  //       editScreen();
  //       lockSoundEffect();
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       if (errorCode === enumErrorsCodes.emailExists) {
  //         setEmailError(enumErrors.existsEmail);
  //       } else if (errorCode === enumErrorsCodes.emailWrong) {
  //         setEmailError(enumErrors.wrongEmail);
  //       } else if (errorCode === enumErrorsCodes.missingPass) {
  //         setPassError(enumErrors.wrongPass);
  //       } else {
  //         setEmailError(enumErrors.serverError);
  //         setPassError(enumErrors.serverError);
  //       }
  //     });
  // };

  const createAcc = async () => {
    const min = 100000000;
    const max = 999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const phoneNumber = randomNumber.toString();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      const defaultUid = "";
      const defaultUserEmail = "";
      const uid = userCredential.user.uid || defaultUid;
      const uEmail = userCredential.user.email || defaultUserEmail;

      await dispatch(userSet({ uid, uEmail, isLogged: true }));
      await dispatch(userSetNumber(phoneNumber));
      await createFirestore(uid, uEmail, phoneNumber);
      await firestorePush(uid);
      resetErrors();
      editScreen();
    } catch (error: any) {}
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

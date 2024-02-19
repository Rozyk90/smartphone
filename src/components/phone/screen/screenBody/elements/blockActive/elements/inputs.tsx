import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../../../../../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { setUser } from "../../../../../../../redux/reducers/user";

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

  const dispatch = useAppDispatch()
  
  const setBtn = (
    event: React.MouseEvent<HTMLElement>,
    newBtn: enumBtns.btnLogin | enumBtns.btnRegistration
  ) => {
    if (newBtn !== null) {
    resetErrors()
      setSelectedBtn(newBtn);
    }
  };

  const changeEmail = (event: any) => {
    resetErrors()

    setEmail(event.target.value);
  };

  const changePass = (event: any) => {
    resetErrors()
    setPass(event.target.value);
  };

  const resetErrors = () =>{
    setPassError(enumErrors.clear);
    setEmailError(enumErrors.clear);
  }

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
    correctDetails = 'Wprowadz poprawne dane'
  }



const loginAcc = async () =>{
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      resetErrors()
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

}


  const createAcc = async () => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        resetErrors()
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .then(() => {

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



    // onAuthStateChanged(auth, (user) => {
    //   console.log('xxxxx', user)
    //   if (user) {
    //     // dispatch(setUser({user}))
    //     // dispatch(setUser(user));
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/auth.user
    //     const defaultUid = "";
    //     const defaultUserEmail = "";
        
    //     const uid = user.uid || defaultUid;
    //     const userEmail = user.email || defaultUserEmail;
        
    //     dispatch(setUser({uid,userEmail}))
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });
  




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

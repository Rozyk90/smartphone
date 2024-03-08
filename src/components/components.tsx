import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Button from "@mui/material/Button";

import Phone from "./phone/phone";
import Charger from "./charger/charger";

import { phoneRotate } from "../redux/reducers/basicStates";
import { plugStatus, chargingStatus } from "../redux/reducers/battery";
import CounterActiveScreen from "./functionalities/counterActiveScreen";

// import { collection, addDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const StyledDesign = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const StyledHeader = styled.div`
  flex: 0 1 auto;
  text-align: center;
`;

const StyledMain = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
`;
const StyledSide = styled.div`
  width: 200px;
  height: 100%;
`;

export default function Components() {
  const dispatch = useAppDispatch();

  const currentScreen = useAppSelector((state) => state.screen.currentScreen);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const uid = useAppSelector((state) => state.user.uid);
  const isOn = useAppSelector((state) => state.basicStates.isOn);
  const { isScreenActive, isCountingDown } = useAppSelector(
    (state) => state.screen
  );
  const isCharging = useAppSelector((state) => state.battery.isCharging);
  const modalIsActive = useAppSelector((state) => state.modal.isModalActive);
  const counterDown = useAppSelector((state) => state.screen.countDown);
  const screenGrid = useAppSelector((state) => state.screen.screenGrid);

  const rotatePhone = () => {
    if (isCharging) {
      dispatch(plugStatus());

      setTimeout(() => {
        dispatch(chargingStatus());
      }, 200);

      setTimeout(() => {
        dispatch(phoneRotate());
      }, 500);
    } else {
      dispatch(phoneRotate());
    }
  };

  // const dodaj = async () => {
  //   const userDocRef = doc(db, "users", uid);
  //   try {
  //     await updateDoc(userDocRef, {
  //       screenGrid,
  //     });
  //     console.log("Dokument zaktualizowany pomyślnie");
  //   } catch (error) {
  //     console.error("Błąd podczas aktualizacji dokumentu: ", error);
  //   }
  // };

  return (
    <StyledDesign>
      <StyledHeader>
        aktualny ekran = {currentScreen}
        <p></p>
        userID = {uid}
        <p></p>
        zalogowany ?? = {isLogged.toString()}
        <p></p>
        jest wlaczony - {isOn.toString()}
        <p></p>
        modal jest aktywny - {modalIsActive.toString()}
        <p></p>
        ekran aktywny - {isScreenActive.toString()} ---- {counterDown / 1000}
        <p></p>
        Jest odliczanie - {isCountingDown.toString()}
        <p></p>
        {/* jest pionowo - {isVertical.toString()} */}
        <p></p>
        {/* ochrona baterii - {isBatteryProtection.toString()} */}
        <p></p>
        {/* szybkie ladowanie - {isFastCharging.toString()} */}
        <p></p>
        {/* wtyczka wlozona - {isPlugConnected.toString()} */}
        <p></p>
        {/* laduje sie - {isCharging.toString()} */}
        <p></p>
        {/* <StyledBig>batery - {batery}</StyledBig> */}
        <p></p>
        <Button variant="contained" onClick={() => rotatePhone()}>
          Obrot
        </Button>
        {/* <Button variant="contained" onClick={() => dodaj()}>
          dodaj
        </Button> */}
      </StyledHeader>

      <StyledMain>
        <StyledSide></StyledSide>
        <Phone></Phone>

        <StyledSide></StyledSide>
        <>
          <CounterActiveScreen />
        </>
      </StyledMain>
      <Charger />
    </StyledDesign>
  );
}

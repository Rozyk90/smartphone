import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import PhoneIcon from "@mui/icons-material/Phone";
import BackspaceRoundedIcon from "@mui/icons-material/BackspaceRounded";

import useDate from "../../../../../../customHooks/useDate";
import useContacts from "../../../../../../customHooks/useContacts";
import { contactSetCalling } from "../../../../../../redux/reducers/contacts/contactsGeneral";
import { contactsHistoryAdd } from "../../../../../../redux/reducers/contacts/contactsHistory";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  enumCurrentScreen,
} from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrenBarTop } from "../../../../../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/screenBarBottom";
import useScreen from "../../../../../../customHooks/useScreen";
import useFirestorePush from "../../../../../../customHooks/useFirestorePush";
import useSound from "../../../../../../customHooks/useSound";

const StyledBody = styled.div`
  height: 550px;
`;

const StyledPhoneNumber = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 2.5rem;
  padding-bottom: 20px;
  color: ${(prop) => prop.theme.fonts.primary};
`;

const keyboardSings = [
  { sign: "1", description: " " },
  { sign: "2", description: "ABC" },
  { sign: "3", description: "DEF" },
  { sign: "4", description: "GHI" },
  { sign: "5", description: "JKL" },
  { sign: "6", description: "MNO" },
  { sign: "7", description: "PQRS" },
  { sign: "8", description: "TUV" },
  { sign: "9", description: "WXYZ" },
  { sign: "*", description: "" },
  { sign: "0", description: "WXYZ" },
  { sign: "#", description: "" },
];

const StyledNumbersArea = styled.div`
  height: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledBtn = styled.button`
  border: none;
  border-radius: 50%;
  background: none;
  height: 60px;
  width: 60px;
  margin: 0px 10px;
  cursor: pointer;
`;

const StyledSign = styled.div`
  font-size: 2rem;
  color: ${(prop) => prop.theme.fonts.primary};
`;
const StyledDescription = styled.div`
  height: 10px;
  font-size: 0.7rem;
  color: ${(prop) => prop.theme.fonts.secondary};
`;

const StyledBottomBtnsArea = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledEmptyDiv = styled.div`
  width: 50px;
`;

const StyledCallBtn = styled.div`
  height: 50px;
  width: 50px;
  background: ${(prop) => prop.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(prop) => prop.theme.white};
  cursor: pointer;
`;

const StyledDelBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(prop) => prop.theme.fonts.primary};
`;

export default function Keyboard() {
  const [number, setNumber] = useState("");

  const { phoneNumber, uid } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { pushCurrentScreen } = useScreen();
  const { getUnixTime } = useDate();
  const { findeContactUid, editContactNumber } = useContacts();
  const { firestorePushCallObj } = useFirestorePush();
  const { keyboardSoundEffect } = useSound();

  const handleNumberClick = (sign: string) => {
    if (number.length < 9) {
      setNumber((prevNumber) => prevNumber + sign);
    }
  };

  const handleDelete = () => {
    setNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const call = async () => {
    dispatch(contactSetCalling(number));
    dispatch(setCurrentScreen(enumCurrentScreen.calling));
    dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
    pushCurrentScreen();

    let toWhoUid;

    if (number.length === 9) {
      toWhoUid = await findeContactUid(number);
    }

    const callObj = {
      unixTime: getUnixTime(),
      elementId: getUnixTime(),
      whoCall: phoneNumber,
      whoCallUid: uid,
      toWho: number,
      toWhoUid: toWhoUid ? toWhoUid : null,
    };

    dispatch(contactsHistoryAdd(callObj));
    if (toWhoUid) {
      firestorePushCallObj(toWhoUid, callObj);
    }
  };

  return (
    <StyledBody>
      <StyledPhoneNumber>{editContactNumber(number)}</StyledPhoneNumber>

      <StyledNumbersArea>
        {keyboardSings.map((sign) => (
          <StyledBtn
            key={sign.sign}
            onClick={() => handleNumberClick(sign.sign)}
            onMouseDown={() => keyboardSoundEffect()}
          >
            <StyledSign>{sign.sign}</StyledSign>
            <StyledDescription>{sign.description}</StyledDescription>
          </StyledBtn>
        ))}
      </StyledNumbersArea>

      <StyledBottomBtnsArea>
        <StyledEmptyDiv />
        <StyledCallBtn onClick={() => call()}>
          <PhoneIcon />
        </StyledCallBtn>
        <StyledDelBtn
          onClick={handleDelete}
          onMouseDown={() => keyboardSoundEffect()}
        >
          <BackspaceRoundedIcon />
        </StyledDelBtn>
      </StyledBottomBtnsArea>
    </StyledBody>
  );
}

import styled, { keyframes } from "styled-components";

import CallIcon from "@mui/icons-material/Call";
import SmsIcon from "@mui/icons-material/Sms";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  enumCurrentScreen,
} from "../../../../../../redux/reducers/screenParts/enumsScreen";
import useSound from "../../../../../../customHooks/useSound";
import useScreen from "../../../../../../customHooks/useScreen";
import { contactsListDelete } from "../../../../../../redux/reducers/contacts/contactsList";
import {
  contactActionTypeSet,
  contactNewContactData,
  contactSetCalling,
} from "../../../../../../redux/reducers/contacts/contactsGeneral";
import {
  contactsHistoryAdd,
  contactsHistoryDelete,
} from "../../../../../../redux/reducers/contacts/contactsHistory";
import useDate from "../../../../../../customHooks/useDate";
import useFirestorePush from "../../../../../../customHooks/useFirestorePush";
import useContacts from "../../../../../../customHooks/useContacts";
import { setCurrenBarTop } from "../../../../../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../../../../../redux/reducers/screenParts/screenBarBottom";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    height: 0;
  }
  90% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledHiddenBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.4s forwards;
`;

const StyledNumber = styled.div`
  padding-bottom: 10px;
  color: ${(prop) => prop.theme.fonts.primary};
  font-weight: bold;
  font-size: 0.8rem;
`;

const StyledBtns = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
`;

const StyledIconBtn = styled.button`
  background: ${(prop) => prop.theme.colors.primary};
  color: ${(prop) => prop.theme.colors.onPrimary};
  border: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface HiddenProps {
  name: string;
  number: string;
  uid: string | null;
  elementId: number;
  cardType: "history" | "list";
}

export default function HiddenElement({
  name,
  number,
  uid,
  elementId,
  cardType,
}: HiddenProps) {
  const { phoneNumber, uid: whoCallUid } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const { pushCurrentScreen } = useScreen();
  const { getUnixTime } = useDate();
  const { firestorePushCallObj } = useFirestorePush();
  const { findeContact,editContactNumber } = useContacts();

  const call = () => {
    const callObj = {
      unixTime: getUnixTime(),
      elementId: getUnixTime(),
      whoCall: phoneNumber,
      whoCallUid: whoCallUid,
      toWho: number,
      toWhoUid: uid,
    };
    dispatch(contactSetCalling(number))
    dispatch(contactsHistoryAdd(callObj));
    dispatch(setCurrentScreen(enumCurrentScreen.calling));
    dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
    pushCurrentScreen();
    if (uid) {
      firestorePushCallObj(uid, callObj);
    }
  };

  const editContact = () => {
    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.newContact));

    const contactId = findeContact(number);
    if (contactId) {
      dispatch(
        contactNewContactData({ name, number, uid, elementId: contactId })
      );
      dispatch(contactActionTypeSet("update"));
    } else {
      dispatch(
        contactNewContactData({ name, number, uid, elementId: getUnixTime() })
      );
      dispatch(contactActionTypeSet("addNew"));
    }
  };

  const deleteElement = () => {
    if (cardType === "history") {
      dispatch(contactsHistoryDelete(elementId));
    } else {
      dispatch(contactsListDelete(elementId));
    }
  };


  return (
    <StyledHiddenBar>
      <StyledNumber>Telefon: {editContactNumber(number)}</StyledNumber>
      <StyledBtns>
        <StyledIconBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => call()}
        >
          <CallIcon />
        </StyledIconBtn>
        <StyledIconBtn>
          <SmsIcon />
        </StyledIconBtn>
        <StyledIconBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => editContact()}
        >
          <InfoIcon />
        </StyledIconBtn>
        <StyledIconBtn
          onMouseDown={() => btnSoundEffect()}
          onClick={() => deleteElement()}
        >
          <DeleteForeverRoundedIcon />
        </StyledIconBtn>
      </StyledBtns>
    </StyledHiddenBar>
  );
}

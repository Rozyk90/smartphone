import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../../../../../redux/hooks";

import CallIcon from "@mui/icons-material/Call";
import SmsIcon from "@mui/icons-material/Sms";
import InfoIcon from "@mui/icons-material/Info";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
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
import { smsOpenWith } from "../../../../../../redux/reducers/sms";

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
  //   elementId: number;
  //   cardType: "history" | "list";
}

const BtnCall = ({ number }: { number: string }) => {
  const { phoneNumber, uid: whoCallUid } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const { getUnixTime } = useDate();
  const { pushCurrentScreen } = useScreen();
  const { firestorePushCallObj } = useFirestorePush();
  const { btnSoundEffect } = useSound();
  const { findeContactUid } = useContacts();

  const call = async () => {
    const uid = await findeContactUid(number);

    const callObj = {
      unixTime: getUnixTime(),
      elementId: getUnixTime(),
      whoCall: phoneNumber,
      whoCallUid: whoCallUid,
      toWho: number,
      toWhoUid: uid,
    };
    dispatch(contactSetCalling(number));
    dispatch(contactsHistoryAdd(callObj));
    dispatch(setCurrentScreen(enumCurrentScreen.calling));
    dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
    pushCurrentScreen();
    if (uid) {
      firestorePushCallObj(uid, callObj);
    }
  };

  return (
    <StyledIconBtn onMouseDown={() => btnSoundEffect()} onClick={() => call()}>
      <CallIcon />
    </StyledIconBtn>
  );
};

// =================================================================================================
// =================================================================================================

const BtnSms = ({ number }: { number: string }) => {
  const { phoneNumber, uid: whoCallUid } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const { getUnixTime } = useDate();
  const { pushCurrentScreen } = useScreen();
  const { firestorePushCallObj } = useFirestorePush();
  const { btnSoundEffect } = useSound();

  const sms = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.conversation));
    dispatch(smsOpenWith(number));
    pushCurrentScreen();
  };

  return (
    <StyledIconBtn onMouseDown={() => btnSoundEffect()} onClick={() => sms()}>
      <SmsIcon />
    </StyledIconBtn>
  );
};

// =================================================================================================
// =================================================================================================

const BtnInfo = ({ number }: { number: string }) => {
  const { phoneNumber, uid: whoCallUid } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const { getUnixTime } = useDate();
  const { pushCurrentScreen } = useScreen();
  const { firestorePushCallObj } = useFirestorePush();
  const { btnSoundEffect } = useSound();
  const { findeContact, findeContactUid, findContactName } = useContacts();

  const editContact = async () => {
    const uid = await findeContactUid(number);
    const name =
      findContactName(number) === number ? "" : findContactName(number);

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

    pushCurrentScreen();
    dispatch(setCurrentScreen(enumCurrentScreen.newContact));
  };

  return (
    <StyledIconBtn
      onMouseDown={() => btnSoundEffect()}
      onClick={() => editContact()}
    >
      <InfoIcon />
    </StyledIconBtn>
  );
};

export { BtnCall, BtnInfo, BtnSms };

import styled from "styled-components";
import { useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";

import { db } from "../../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import SmsIcon from "@mui/icons-material/Sms";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

const StyledNotificationList = styled.div`
  display: flex;
  gap: 5px;
`;

export default function NotificationList() {
  const { contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );

  return (
    <StyledNotificationList>
      <SmsIcon sx={{ fontSize: 12 }}></SmsIcon>
      {contactsHistoryNotification && (
        <PhoneMissedIcon sx={{ fontSize: 12 }}></PhoneMissedIcon>
      )}
    </StyledNotificationList>
  );
}

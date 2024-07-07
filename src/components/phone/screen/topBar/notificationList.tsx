import styled from "styled-components";
import { useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";

const StyledNotificationList = styled.div`
  display: flex;
  gap: 5px;
`;

export default function NotificationList() {
  const { contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );
  const { smsNotification } = useAppSelector((state) => state.sms);

  return (
    <StyledNotificationList>
      {smsNotification && <QuestionAnswerIcon sx={{ fontSize: 12 }}/>}
      {contactsHistoryNotification && <PhoneMissedIcon sx={{ fontSize: 12 }} />}
    </StyledNotificationList>
  );
}

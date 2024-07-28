import styled from "styled-components";
import { useEffect } from "react";
import { useAppSelector } from "../../../../redux/hooks";

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';


const StyledNotificationList = styled.div`
  display: flex;
  gap: 5px;
`;

export default function NotificationList() {
  const { contactsHistoryNotification } = useAppSelector(
    (state) => state.contacts.history
  );
  const { smsNotification } = useAppSelector((state) => state.sms);
  const {unixtimeStart:timerStart} = useAppSelector(state => state.clock.timer)
  const {unixtimeStart:stopwatchStart} = useAppSelector(state => state.clock.stopwatch)

  return (
    <StyledNotificationList>
      {smsNotification && <QuestionAnswerIcon sx={{ fontSize: 12 }}/>}
      {contactsHistoryNotification && <PhoneMissedIcon sx={{ fontSize: 12 }} />}
      {timerStart>0 && <HourglassBottomRoundedIcon sx={{ fontSize: 12 }} />}
      {stopwatchStart>0 && <AccessAlarmRoundedIcon sx={{ fontSize: 12 }} />}
    </StyledNotificationList>
  );
}

import styled from "styled-components"

import SmsIcon from '@mui/icons-material/Sms';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';

const StyledNotificationList = styled.div`
    display: flex;
    gap: 5px;
`

export default function NotificationList(){


    return(
    <StyledNotificationList>
    <SmsIcon sx={{ fontSize: 12 }} ></SmsIcon>
    <PhoneMissedIcon sx={{ fontSize: 12 }} ></PhoneMissedIcon>

    
    </StyledNotificationList>)
}
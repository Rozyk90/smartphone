import styled from "styled-components";

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(0,143,170);
background: linear-gradient(175deg, rgba(0,143,170,1) 30%, rgba(0,129,182,1) 60%);
  color: white;
  cursor: pointer;

`;

export default function IconCalendar() {
  const klik = () => {
    console.log("klikam w to = kalendarz");
  };
  return (
    <StyledIcon
      onClick={() => {
        klik();
      }}
    >
      <CalendarMonthRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}

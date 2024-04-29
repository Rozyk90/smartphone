import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";

import { resetScreenCountingDownShort } from "../../redux/reducers/screenParts/screenGeneral";

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
  const dispatch = useAppDispatch()
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenCalendar))
  };
  return (
    <StyledIcon
      onClick={() => {
        fn();
      }}
    >
      <CalendarMonthRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}

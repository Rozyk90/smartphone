import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";

import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';

import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";

import { resetScreenCountingDownShort } from "../../redux/reducers/screenParts/screenGeneral";

const StyledIcon = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(96,85,213);
background: linear-gradient(175deg, rgba(96,85,213,1) 30%, rgba(63,76,155,1) 60%);
  color: white;
  cursor: pointer;

`;

export default function IconClock() {
  const dispatch = useAppDispatch()
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenClock))
  };
  return (
    <StyledIcon
      onClick={() => {
        fn();
      }}
    >
      <WatchLaterRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}

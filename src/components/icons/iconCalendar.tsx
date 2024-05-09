import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(0, 143, 170);
  background: linear-gradient(
    175deg,
    rgba(0, 143, 170, 1) 30%,
    rgba(0, 129, 182, 1) 60%
  );
  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
`;

export default function IconCalendar({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.screenCalendar));
    }
  };
  return (
    <StyledIcon
      $isButton={isButton}
      onClick={() => {
        fn();
      }}
    >
      <CalendarMonthRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}

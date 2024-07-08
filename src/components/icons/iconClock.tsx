import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";

import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import useSound from "../../customHooks/useSound";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(96, 85, 213);
  background: linear-gradient(
    175deg,
    rgba(96, 85, 213, 1) 30%,
    rgba(63, 76, 155, 1) 60%
  );
  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
  display: flex;
  justify-content: center;
  align-items: center;`;

export default function IconClock({ isButton = true }: { isButton?: boolean }) {
  const dispatch = useAppDispatch();
  const {btnSoundEffect} = useSound()
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.screenClock));
      btnSoundEffect()
    }
  };
  return (
    <StyledIcon
      $isButton={isButton}
      onClick={() => {
        fn();
      }}

    >
      <WatchLaterRoundedIcon fontSize="large" />
    </StyledIcon>
  );
}

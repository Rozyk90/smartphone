import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { enumCurrentBarBottom, enumCurrentBarTop, enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";

import SettingsIcon from "@mui/icons-material/Settings";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";
import useSound from "../../customHooks/useSound";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: radial-gradient(
    circle,
    rgba(41, 58, 101, 1) 30%,
    rgba(50, 71, 91, 1) 60%
  );
  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
`;

export default function IconSettings({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const {btnSoundEffect} = useSound()
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.settingsMain));
      dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary))
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary))
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
      <SettingsIcon fontSize="large" />
    </StyledIcon>
  );
}

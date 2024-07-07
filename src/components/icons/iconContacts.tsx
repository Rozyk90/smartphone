import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import {
  enumCurrentScreen,
  enumCurrentBarTop,
  enumCurrentBarBottom,
} from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";

import PhoneIcon from "@mui/icons-material/Phone";
import useSound from "../../customHooks/useSound";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: #01a463;

  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
`;

export default function IconContacts({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.contacts));
      dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
      btnSoundEffect();
    }
  };
  return (
    <StyledIcon
      $isButton={isButton}
      onClick={() => {
        fn();
      }}
    >
      <PhoneIcon fontSize="large" />
    </StyledIcon>
  );
}

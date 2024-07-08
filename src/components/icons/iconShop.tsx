import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { enumCurrentBarBottom, enumCurrentBarTop, enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import useSound from "../../customHooks/useSound";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(229, 52, 19);
  background: linear-gradient(
    342deg,
    rgba(229, 52, 19, 1) 30%,
    rgba(220, 41, 97, 1) 60%
  );
  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
  display: flex;
  justify-content: center;
  align-items: center;
  `;

export default function IconShop({ isButton = true }: { isButton?: boolean }) {
  const dispatch = useAppDispatch();
  const {btnSoundEffect} = useSound()
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.screenShop));
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
      <LocalMallIcon fontSize="large" />
    </StyledIcon>
  );
}

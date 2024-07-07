import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import {
    enumCurrentBarBottom,
    enumCurrentBarTop,
    enumCurrentScreen,
  } from "../../redux/reducers/screenParts/enumsScreen";
  import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
  import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
  import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";
import CalculateIcon from '@mui/icons-material/Calculate';
import useSound from "../../customHooks/useSound";

const StyledIcon = styled.button<{ $isButton: boolean }>`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: rgb(229, 52, 19);
  background: linear-gradient(
    342deg,
    #44c063 30%,
    rgba(220, 41, 97, 1) 60%
  );
  color: white;
  cursor: ${(prop) => (prop.$isButton ? "pointer" : "default")};
`;

export default function IconCalculator({ isButton = true }: { isButton?: boolean }) {
  const dispatch = useAppDispatch();
  const {btnSoundEffect} = useSound()
  const fn = () => {
    if (isButton) {
      dispatch(setCurrentScreen(enumCurrentScreen.calculator))
      dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
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
      <CalculateIcon fontSize="large" />
    </StyledIcon>
  );
}

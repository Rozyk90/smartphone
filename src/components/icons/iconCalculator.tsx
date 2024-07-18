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
import CalculateIcon from "@mui/icons-material/Calculate";
import useSound from "../../customHooks/useSound";

const StyledIconBtn = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(
    48deg,
    rgba(34, 166, 34, 1) 28%,
    rgba(24, 196, 5, 1) 100%
  );
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.div`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(
    48deg,
    rgba(34, 166, 34, 1) 28%,
    rgba(24, 196, 5, 1) 100%
  );
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function IconCalculator({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();

  const fn = () => {
      dispatch(setCurrentScreen(enumCurrentScreen.calculator));
      dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
      btnSoundEffect();
  };

  return isButton ? (
    <StyledIconBtn
      onClick={() => {
        fn();
      }}
    >
      <CalculateIcon fontSize="large" />
    </StyledIconBtn>
  ) : (
    <StyledIcon>
      <CalculateIcon fontSize="large" />
    </StyledIcon>
  );
}

import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import {
  enumCurrentScreen,
  enumCurrentBarTop,
  enumCurrentBarBottom,
} from "../../redux/reducers/screenParts/enumsScreen";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import useSound from "../../customHooks/useSound";
import { setCurrenBarTop } from "../../redux/reducers/screenParts/screenBarTop";
import { setCurrentBarBottom } from "../../redux/reducers/screenParts/screenBarBottom";

const StyledIconBtn = styled.button`
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
  background: rgb(96, 85, 213);
  background: linear-gradient(
    175deg,
    rgba(96, 85, 213, 1) 30%,
    rgba(63, 76, 155, 1) 60%
  );
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function IconGameMemory({
  isButton = true,
}: {
  isButton?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.gameMemory));
    dispatch(setCurrenBarTop(enumCurrentBarTop.bgPrimary));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.bgPrimary));
    btnSoundEffect();
  };
  return isButton ? (
    <StyledIconBtn onClick={() => fn()}>
      <VideogameAssetIcon fontSize="large" />
    </StyledIconBtn>
  ) : (
    <StyledIcon>
      <VideogameAssetIcon fontSize="large" />
    </StyledIcon>
  );
}

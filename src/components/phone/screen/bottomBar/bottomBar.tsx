import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Button } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { enumCurrentBarBottom } from "../../../../redux/reducers/screenParts/enumsScreen";

import useScreen from "../../../../customHooks/useScreen";
import useSound from "../../../../customHooks/useSound";

const StyledBarBottom = styled.div<{
  $barBg: enumCurrentBarBottom;
}>`
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  height: 28px;
  display: flex;
  justify-content: center;
  gap: 15px;

  background: ${(props) => {
    switch (props.$barBg) {
      case enumCurrentBarBottom.off:
        return props.theme.backgrounds.off;
      case enumCurrentBarBottom.bgPrimary:
        return props.theme.backgrounds.primary;
      case enumCurrentBarBottom.transparent:
        return "none";
      case enumCurrentBarBottom.transparentEmpty:
        return "none";
      default:
        return "none";
    }
  }};
`;

const StyledButton = styled(Button)`
  && {
    color: ${(prop) => prop.theme.fonts.primary};
    border-radius: 20px;
    height: 24px;
  }
`;

const StyledIcon = styled(MenuRoundedIcon)`
  transform: rotate(90deg);
`;

const StyledBarBottomOff = styled.div`
  background: ${(prop) => prop.theme.backgrounds.off};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  height: 28px;
`;

export default function BottomBar() {
  const { currentBarBottom } = useAppSelector(
    (state) => state.screen.barBottom
  );
  const { toMainScreen, backToPreviousScreen } = useScreen();
  const {btnSoundEffect} = useSound()

  return (
    <>
      {currentBarBottom === enumCurrentBarBottom.off && <StyledBarBottomOff />}

      {(currentBarBottom === enumCurrentBarBottom.transparent ||
        currentBarBottom === enumCurrentBarBottom.bgPrimary) && (
        <StyledBarBottom $barBg={currentBarBottom}>
          <StyledButton onMouseDown={()=>btnSoundEffect()}>
            <StyledIcon fontSize="small" />
          </StyledButton>
          <StyledButton onMouseDown={()=>btnSoundEffect()} onClick={() => toMainScreen()}>
            <CropSquareRoundedIcon fontSize="small" />
          </StyledButton>
          <StyledButton onMouseDown={()=>btnSoundEffect()}
            onClick={() => {
              backToPreviousScreen();
            }}
          >
            <ArrowBackIosRoundedIcon fontSize="small" />
          </StyledButton>
        </StyledBarBottom>
      )}
      {currentBarBottom === enumCurrentBarBottom.transparentEmpty && <StyledBarBottom $barBg={currentBarBottom}/>}
    </>
  );
}

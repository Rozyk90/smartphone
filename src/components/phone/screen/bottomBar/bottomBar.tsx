import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Button } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import {
  enumCurrentBarBottom,
  enumCurrentBarTop,
  enumCurrentScreen,
} from "../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../redux/reducers/screenParts/screenBarBottom";
import { resetScreenCountingDownShort } from "../../../../redux/reducers/screenParts/screenGeneral";

import { setCurrentScreen } from "../../../../redux/reducers/screenParts/screenCenter";
import { setCurrenBarTop } from "../../../../redux/reducers/screenParts/screenBarTop";

const StyledBarBottom = styled.div<{
  $barBg: enumCurrentBarBottom;
}>`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 28px;
`;

export default function BottomBar() {
  const currentBarBottom = useAppSelector(
    (state) => state.screen.barBottom.currentBarBottom
  );

  const dispatch = useAppDispatch();

  const MainScreen = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenMain));
    dispatch(setCurrenBarTop(enumCurrentBarTop.transparent));
    dispatch(setCurrentBarBottom(enumCurrentBarBottom.transparent));
  };

  return (
    <>
      {currentBarBottom === enumCurrentBarBottom.off && <StyledBarBottomOff />}

      {(currentBarBottom === enumCurrentBarBottom.transparent ||
        currentBarBottom === enumCurrentBarBottom.bgPrimary) && (
        <StyledBarBottom $barBg={currentBarBottom}>
          <StyledButton>
            <StyledIcon fontSize="small" />
          </StyledButton>
          <StyledButton onClick={() => MainScreen()}>
            <CropSquareRoundedIcon fontSize="small" />
          </StyledButton>
          <StyledButton>
            <ArrowBackIosRoundedIcon fontSize="small" />
          </StyledButton>
        </StyledBarBottom>
      )}
    </>
  );
}

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Button } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { enumCurrentBarBottom } from "../../../../redux/reducers/screenParts/enumsScreen";
import { setCurrentBarBottom } from "../../../../redux/reducers/screenParts/screenBarBottom";
import { resetScreenCountingDownShort } from "../../../../redux/reducers/screenParts/screenGeneral";

import {
  enumCurrentModal,
  enumModalTurnOffBtnsFocus,
  modalTurnOff,
  setCurrentModal,
  setTurnOffBtnsFocus,
} from "../../../../redux/reducers/modal";

const StyledBottomActive = styled.div`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 28px;
  display: flex;
  justify-content: center;
  gap: 15px;
  border: 1px solid red; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
`;

const StyledButton = styled(Button)`
  && {
    color: white;
    border-radius: 20px;
    height: 24px;
  }
`;

const StyledIcon = styled(MenuRoundedIcon)`
  transform: rotate(90deg);
`;

const StyledBottomBarOff = styled.div`
  border: 1px solid red; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
  background: #1b1b1b;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 28px;
`;

const StyledBarBottomBack = styled.div`
  border: 1px solid red; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
  background: #1b1b1b;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 28px;
  padding-left: 200px;
`;

const StyledBarBottomNone = styled.div`
  border: 1px solid red; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 28px;
`;

export default function BottomBar() {
  const currentBarBottom = useAppSelector(
    (state) => state.screen.barBottom.currentBarBottom
  );
  const currentBtnFocus = useAppSelector(
    (state) => state.modal.turnOffBtnsFocus
  );

  const dispatch = useAppDispatch();

  const OnlyBackClick = () => {
    if (currentBtnFocus === enumModalTurnOffBtnsFocus.all) {
      dispatch(resetScreenCountingDownShort());

      dispatch(setCurrentModal(enumCurrentModal.modalNone));
      dispatch(modalTurnOff());
      dispatch(setCurrentBarBottom(enumCurrentBarBottom.none));
    } else {
      dispatch(setTurnOffBtnsFocus(enumModalTurnOffBtnsFocus.all));
      dispatch(resetScreenCountingDownShort());
    }
  };

  return (
    <>
      {currentBarBottom === enumCurrentBarBottom.off && <StyledBottomBarOff />}
      {currentBarBottom === enumCurrentBarBottom.none && (
        <StyledBarBottomNone />
      )}

      {currentBarBottom === enumCurrentBarBottom.on && (
        <StyledBottomActive>
          <StyledButton>
            <StyledIcon fontSize="small" />
          </StyledButton>
          <StyledButton>
            <CropSquareRoundedIcon fontSize="small" />
          </StyledButton>
          <StyledButton>
            <ArrowBackIosRoundedIcon fontSize="small" />
          </StyledButton>
        </StyledBottomActive>
      )}

      {currentBarBottom === enumCurrentBarBottom.backOnly && (
        <StyledBarBottomBack>
          <StyledButton onClick={() => OnlyBackClick()}>
            <ArrowBackIosRoundedIcon fontSize="small" />
          </StyledButton>
        </StyledBarBottomBack>
      )}
    </>
  );
}

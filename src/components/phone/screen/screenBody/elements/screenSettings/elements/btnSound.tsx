import styled from "styled-components";

import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";

const StyledBtn = styled.button`
  border: none;
  background: #fcfcfc;
  height: 60px;
  min-height: 60px;
  border-radius: 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const StyledIconBackground = styled.div`
  background: #6d74df;
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  size: 5px;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
`;

const StyledSubtitle = styled.div`
  color: #939393;
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledDot = styled.div`
  background: #939393;
  height: 5px;
  width: 5px;
  border-radius: 50%;
`;

export default function BtnSound() {
  const dispatch = useAppDispatch()
  const fn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettingsSounds))
  };

  return (
    <StyledBtn onClick={fn}>
      <>
        <StyledIconBackground>
          <VolumeUpRoundedIcon fontSize="small" />
        </StyledIconBackground>
      </>

      <StyledDescription>
        <StyledTitle>Dźwięki i wibracja</StyledTitle>
        <StyledSubtitle>
          Tryb dźwięku
          <StyledDot />
          Dzwonek
        </StyledSubtitle>
      </StyledDescription>
    </StyledBtn>
  );
}

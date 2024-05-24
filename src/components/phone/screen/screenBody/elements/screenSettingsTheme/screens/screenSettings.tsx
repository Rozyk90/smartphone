import styled from "styled-components";
import { useAppSelector } from "../../../../../../../redux/hooks";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Switch from "@mui/material/Switch";

const StyledScreen = styled.div<{ $darkMode: boolean }>`
  width: 110px;
  height: 230px;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: ${({ $darkMode }) => ($darkMode ? "none" : "5px 5px 5px gray")};
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px 30px 5px;
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 12px;
  font-weight: bold;
`;
const StyledIcon = styled(ArrowBackIosRoundedIcon)`
  && {
    font-size: 12px;
  }
`;

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px;
`;

const StyledSwitchCard = styled.div`
  height: 20px;
  background: ${(prop) => prop.theme.colors.background};
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding-left: 5px;
`;
const StyledSwitch = styled(Switch)`
  & .MuiSwitch-switchBase {
    cursor: default;

    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
    &.Mui-checked + .MuiSwitch-track {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const StyledPaggination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  margin: 10px auto;
`;

const StyledBtnLeft = styled(ArrowBackIosRoundedIcon)`
  && {
    font-size: 14px;
  }

  color: ${(prop) => prop.theme.off};
`;
const StyledBtnRight = styled(ArrowForwardIosRoundedIcon)`
  && {
    font-size: 14px;
  }
  color: ${(prop) => prop.theme.colors.primary};
`;

const StyledDotOn = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(prop) => prop.theme.colors.primary};
`;
const StyledDotOff = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(prop) => prop.theme.off};
`;

export default function ScreenSettings() {
  const { darkMode } = useAppSelector((state) => state.theme);
  return (
    <StyledScreen $darkMode={darkMode}>
      <StyledTitle>
        <StyledIcon />
        Ustawienia
      </StyledTitle>

      <StyledCards>
        <StyledSwitchCard>Zmień tapety</StyledSwitchCard>
        <StyledSwitchCard>Palety kolorów</StyledSwitchCard>

        <StyledSwitchCard>
          Przycisk
          <StyledSwitch checked={true} size="small" />
        </StyledSwitchCard>
        <StyledSwitchCard>
          Przycisk
          <StyledSwitch checked={false} size="small" />
        </StyledSwitchCard>
      </StyledCards>
      <StyledPaggination>
        <StyledBtnLeft />
        <StyledDotOn />
        <StyledDotOff />
        <StyledDotOff />
        <StyledBtnRight />
      </StyledPaggination>
    </StyledScreen>
  );
}

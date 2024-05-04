import styled from "styled-components";
import SettingsTitle from "./settingsTitle";
import Clock, { enumClockSizes } from "../../../../apps/clock/clock";
import Calendar from "../../../../apps/calendar/calendar";
import { useAppSelector } from "../../../../../redux/hooks";
import Finger from "./screenBlockActive/elements/finger";

const StyledTheme = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledPreview = styled.div`
  border: 1px solid red;
  height: 260px;
  display: flex;
  justify-content: space-around;
`;
const StyledScreen = styled.div<{ bg: string }>`
  width: 110px;
  height: 230px;
  background: ${(prop) => prop.bg};
  border-radius: 10px;
`;
const StyledClockBox = styled.div`
  text-align: center;
  transform: scale(0.5);
`;

export default function ScreenTheme() {
  const background = useAppSelector((state) => state.theme.background);
  return (
    <StyledTheme>
      <SettingsTitle title="Tapeta i styl" />
      <StyledPreview>
        <StyledScreen bg={background}>
          <StyledClockBox>
            <Clock size={enumClockSizes.large} />
            <Calendar />
          </StyledClockBox>
        </StyledScreen>
        <StyledScreen bg={background} />
      </StyledPreview>
    </StyledTheme>
  );
}

import styled from "styled-components";
import { useAppSelector } from "../../../../../redux/hooks";
import SettingsTitle from "./settingsTitle";
import Clock, { enumClockSizes } from "../../../../apps/clock/clock";
import Calendar from "../../../../apps/calendar/calendar";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import RenderIcon, { RenderIconSmall } from "../../../../icons/renderIcon";

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
  text-align: center;
  width: 110px;
  height: 230px;
  background: ${(prop) => prop.bg};
  border-radius: 10px;
`;

const StyledScaleBox = styled.div`
  transform: scale(0.5);
`;

const StyledFinger = styled(FingerprintIcon)`
  margin-top: 80px;
  transform: scale(0.5);
  color: ${(prop) => prop.theme.white};
  && {
    height: 60px;
    width: 60px;
  }
`;

// ================================

const StyledScaleBox2 = styled.div`
  height: 500px;
  width: 270px;
  margin-top: -130px;
  margin-left: -82px;
  transform: scale(0.4);
`;

const StyledIconsMap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: stretch;
  justify-content: stretch;
  height: 100%;
  width: 100%;
  padding-top: 12px;
  padding-left: 12px;
`;

export default function ScreenTheme() {
  const background = useAppSelector((state) => state.theme.background);
  const grid = useAppSelector((state) => state.screen.center.screenGrid);

  return (
    <StyledTheme>
      <SettingsTitle title="Tapeta i styl" />
      <StyledPreview>
        <StyledScreen bg={background}>
          <StyledScaleBox>
            <Clock size={enumClockSizes.large} />
            <Calendar />
          </StyledScaleBox>
          <StyledFinger />
        </StyledScreen>

        <StyledScreen bg={background}>
          <StyledScaleBox2>
            <StyledIconsMap>
              {grid.map((icon, id) => {
                return <RenderIconSmall icon={grid[id]} />;
              })}
            </StyledIconsMap>
          </StyledScaleBox2>
        </StyledScreen>
      </StyledPreview>
    </StyledTheme>
  );
}

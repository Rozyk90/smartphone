import styled from "styled-components";
import { useAppSelector } from "../../../../../../../redux/hooks";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Clock, { enumClockSizes } from "../../../../../../apps/clock/clock";
import Calendar from "../../../../../../apps/calendar/calendar";
import { RenderIconSmall } from "../../../../../../icons/renderIcon";
import backgrounds from "../../../../../../../theme/backgrounds";

const StyledPreview = styled.div`
  height: 260px;
  display: flex;
  justify-content: space-around;
`;

interface StyledBGprops {
  $darkMode: boolean;
  $group: "gradients" | "photos";
  $id: number;
}

const StyledScreen = styled.div<StyledBGprops>`
  text-align: center;
  width: 110px;
  height: 230px;
  background: ${({ $group, $id }) =>
    $group === "gradients"
      ? backgrounds.gradients[$id].content
      : `url(${backgrounds.photos[$id].content}) center/cover`};
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: ${({ $darkMode }) => ($darkMode ? "none" : "5px 5px 5px gray")};
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

const ScreenPreview = () => {
  const { background, darkMode } = useAppSelector((state) => state.theme);
  const grid = useAppSelector((state) => state.screen.center.screenGrid);

  return (
    <StyledPreview>
      <StyledScreen
        $group={background.group}
        $id={background.id}
        $darkMode={darkMode}
      >
        <StyledScaleBox>
          <Clock size={enumClockSizes.large} />
          <Calendar />
        </StyledScaleBox>
        <StyledFinger />
      </StyledScreen>

      <StyledScreen
        $group={background.group}
        $id={background.id}
        $darkMode={darkMode}
      >
        <StyledScaleBox2>
          <StyledIconsMap>
            {grid.map((icon, id) => {
              return <RenderIconSmall key={id} icon={grid[id]} />;
            })}
          </StyledIconsMap>
        </StyledScaleBox2>
      </StyledScreen>
    </StyledPreview>
  );
};

export default ScreenPreview;
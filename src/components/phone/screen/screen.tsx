import styled from "@emotion/styled";
import { useAppSelector } from "../../../redux/hooks";

import TopBar from "./topBar/topBar";
import ScreenBody from "./screenBody/screenBody";
import BottomBar from "./bottomBar/bottomBar";
import Modals from "./modals/modals";
import backgrounds from "../../../theme/backgrounds";

interface StyledBGprops {
  $group: "gradients" | "photos";
  $id: number;
}

const StyledScreen = styled.div<StyledBGprops>`
  background: ${({ $group, $id }) =>
    $group === "gradients"
      ? backgrounds.gradients[$id].content
      : `url(${backgrounds.photos[$id].content}) center/cover`};
  position: relative;
  width: 310px;
  height: 656px;
  border-radius: 20px;
`;

export default function Screen() {
  const background = useAppSelector((state) => state.theme.background);
  const modalIsActive = useAppSelector((state) => state.modal.isModalActive);
  return (
    <StyledScreen $group={background.group} $id={background.id}>
      <TopBar />
      <ScreenBody />
      <BottomBar />
      {modalIsActive && <Modals />}
    </StyledScreen>
  );
}

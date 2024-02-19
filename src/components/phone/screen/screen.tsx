import styled from "@emotion/styled";

import TopBar from "./topBar/topBar";
import ScreenBody from "./screenBody/screenBody";
import BottomBar from "./bottomBar/bottomBar";
import Modals from "./modals/modals";
import { useAppSelector } from "../../../redux/hooks";

const StyledScreen = styled.div<{background:string}>`
  position: relative;
  /* background: #1b1b1b; */
  /* background: #9dcca17a; */
background: ${prop=>prop.background};
  width: 310px;
  height: 656px;
  border-radius: 20px;
`;

export default function Screen() {
  const background = useAppSelector(state => state.screen.background)
  const modalIsActive = useAppSelector(state => state.modal.isModalActive)
  return (
    <StyledScreen background={background}>
      {modalIsActive &&< Modals />}
      <TopBar />
      <ScreenBody />
      <BottomBar />
    </StyledScreen>
  );
}

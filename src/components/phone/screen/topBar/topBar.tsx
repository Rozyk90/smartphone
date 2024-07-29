import styled from "styled-components";

import Clock from "../../../time/clocks";
import { enumClockSizes } from "../../../time/clocks";
import IconList from "./notificationList";
import TopBarBattery from "../../../functionalities/battery/topBarBattery";
import { useAppSelector } from "../../../../redux/hooks";
import { enumCurrentBarTop } from "../../../../redux/reducers/screenParts/enumsScreen";

const StyledTopBar = styled.div<{
  $barBg: enumCurrentBarTop;
}>`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 28px;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 0px 15px;
  color: ${(prop) => prop.theme.fonts.primary};
  background: ${(props) => {
    switch (props.$barBg) {
      case enumCurrentBarTop.off:
        return props.theme.backgrounds.off;
      case enumCurrentBarTop.bgPrimary:
        return props.theme.backgrounds.primary;
      case enumCurrentBarTop.transparent:
        return "none";
      default:
        return "none";
    }
  }};
  position: relative;
  z-index: 5;
`;

const StyledLeftBox = styled.div``;
const StyledNotifications = styled.div`
  width: 100%;
  display: flex;
`;

const StyledNotificationsLeft = styled.div`
  width: 50%;
`;
const StyledNotificationsRight = styled.div`
  width: 50%;
`;

const StyledRightBox = styled.div``;

const StyledBarTopOff = styled.div`
  background: ${(prop) => prop.theme.backgrounds.off};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 28px;
`;

export default function TopBar() {
  const currentBarTop = useAppSelector(
    (state) => state.screen.barTop.currentBarTop
  );

  return (
    <>
      {currentBarTop === enumCurrentBarTop.off && <StyledBarTopOff />}

      {(currentBarTop === enumCurrentBarTop.transparent ||
        currentBarTop === enumCurrentBarTop.bgPrimary) && (
        <StyledTopBar $barBg={currentBarTop}>
          <StyledLeftBox>
            <Clock size={enumClockSizes.small} />
          </StyledLeftBox>
          <StyledNotifications>
            <StyledNotificationsLeft>
              <IconList />
            </StyledNotificationsLeft>
            <StyledNotificationsRight></StyledNotificationsRight>
          </StyledNotifications>
          <StyledRightBox>
            <TopBarBattery />
          </StyledRightBox>
        </StyledTopBar>
      )}
    </>
  );
}

import styled from "styled-components";

import Clock from "../../../apps/clock/clock";
import { enumClockSizes } from "../../../apps/clock/clock";
import IconList from "../../../functionalities/notificationList";
import TopBarBattery from "../../../functionalities/battery/topBarBattery";
import { useAppSelector } from "../../../../redux/hooks";
import { enumCurrentBarTop } from "../../../../redux/reducers/screen";

const StyledTopBarOn = styled.div`
  /* background: #00ff55; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 28px;
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 0px 15px;
  border: 1px solid red; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
`;

const StyledLeftBox = styled.div`
  /* background: orange; */
`;
const StyledNotifications = styled.div`
  /* background: pink; */
  width: 100%;
  display: flex;
`;

const StyledNotificationsLeft = styled.div`
  /* background: greenyellow; */
  width: 50%;
`;
const StyledNotificationsRight = styled.div`
  /* background: #2fffee; */
  width: 50%;
`;

const StyledRightBox = styled.div`
  /* background: green; */
  color: white;
`;

const StyledBarTopOff = styled.div`
  background: #1b1b1b;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 28px;
  border: 1px solid orange; // do skasowania !!!!!!!!!!!!!!!!!!!!!!
`;

export default function TopBar() {
  const currentBarTop = useAppSelector((state) => state.screen.currentBarTop);
  const isOn = useAppSelector((state) => state.basicStates.isOn);

  return (
    <>

      {currentBarTop === enumCurrentBarTop.off && <StyledBarTopOff/>}

      {currentBarTop === enumCurrentBarTop.on && (
        <StyledTopBarOn>
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
        </StyledTopBarOn>
      )}
    </>
  );
}

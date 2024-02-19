import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import React from "react";
import ReturnBatteryIcon from "./returnBatteryIcon";

const StyledBattery = styled.div`
  display: flex;
  font-size: 12px;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: flex-end;
`;

export default function TopBarBattery() {
  const { isCharging, battery, isShowingValue } = useAppSelector(
    (state) => state.battery
  );

  const RegularIcon = ReturnBatteryIcon(battery, isCharging);

  return (
    <StyledBattery>
      {isShowingValue && <>{battery}%</>}
      <StyledIcon>
        <RegularIcon style={{ fontSize: "14px" }} />
      </StyledIcon>
    </StyledBattery>
  );
}

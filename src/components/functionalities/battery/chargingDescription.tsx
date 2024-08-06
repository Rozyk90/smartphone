import styled from "styled-components";
import { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";

import { TimersCharging } from "../../charger/timers";
import ReturnBatteryIcon from "./returnBatteryIcon";

const StyledChargingDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
`;

export default function ChargingDescription() {
  const { battery, isBatteryProtection } = useAppSelector(
    (state) => state.battery
  );

  return (
    <StyledChargingDescription>
      {(isBatteryProtection && battery >= 85) || battery === 100 ? (
        <ChargingEndDescriptions />
      ) : (
        <CountDescription></CountDescription>
      )}
    </StyledChargingDescription>
  );
}

// ==========================================================================

const StyledBatteryLvl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-weight: 100;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 1rem;
`;

function CountDescription() {
  const [timer, setTimer] = useState(TimersCharging.basicCharging);

  const { isCharging, battery, isFastCharging, isBatteryProtection } =
    useAppSelector((state) => state.battery);
  const { isOn } = useAppSelector((state) => state.basicStates);
  const { isScreenOn } = useAppSelector((state) => state.screen.general);

  const countTime = () => {
    const toCharge = (isBatteryProtection ? 85 : 100) - battery;
    return Math.ceil((toCharge * (timer / 1000)) / 60);
  };

  const BatteryIcon = ReturnBatteryIcon(battery, isCharging);

  useEffect(() => {
    if (isCharging) {
      if (isFastCharging) {
        isScreenOn
          ? setTimer(TimersCharging.basicCharging)
          : setTimer(TimersCharging.fastCharging);
      } else {
        isScreenOn
          ? setTimer(TimersCharging.slowCharging)
          : setTimer(TimersCharging.basicCharging);
      }
    }
  }, [
    battery,
    isCharging,
    isScreenOn,
    isOn,
    isFastCharging,
    isBatteryProtection,
  ]);

  return (
    <StyledBatteryLvl>
      <StyledIcon>
        <BatteryIcon style={{ fontSize: "1.2rem" }} />
        {battery}%
      </StyledIcon>
      {countTime()} min do pełnego naładowania
    </StyledBatteryLvl>
  );
}

// ==========================================================================

const StyledBatteryProtectionyWarning = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
`;

function ChargingEndDescriptions() {
  const isBatteryProtection = useAppSelector(
    (state) => state.battery.isBatteryProtection
  );
  return (
    <>
      {isBatteryProtection ? (
        <StyledBatteryProtectionyWarning>
          Ładowanie wstrzymane
          <p />
          Ochrona baterii ogranicza poziom naładowania
          <p />
          do 85%
        </StyledBatteryProtectionyWarning>
      ) : (
        <>W pełni naładowana</>
      )}
    </>
  );
}

import styled from "styled-components";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";

import {
  TimersCharging,
  TimersUncharging,
} from "../../../../../../charger/timers";

const StyledBatteryStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledTime = styled.div`
  color: #424242;
  font-size: 20px;
  font-weight: 600;
`;
const StyledTimeDescription = styled.div`
  color: #424242;
  font-size: 15px;
  font-weight: 600;
`;

const StyledLittleDescription = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const StyledBar = styled.div`
  border-radius: 5px;
  height: 26px;
  width: 280px;
  background: #e8e8e8;
`;

const StyledGreenLane = styled.div<{ progres: number }>`
  border-radius: 13px;
  height: 26px;
  background: ${(prop) => (prop.progres > 15 ? "#80dd8d" : "#e25f4d")};
  width: ${(prop) => prop.progres}%;
  transition: 0.5s;
`;

const StyledBarBorder = styled.div`
  background: rgba(0, 0, 0, 0);
  height: 26px;
  border-radius: 20px;
  border: 5px solid #f1f1f1;
  position: relative;
  top: -31px;
  left: -5px;
`;

export default function BatteryStatus() {
  const { isCharging, battery, isBatteryProtection, isFastCharging } =
    useAppSelector((state) => state.battery);

  const chargingTime = () => {
    const toCharge = (isBatteryProtection ? 85 : 100) - battery;
    const chargingSpeed = isFastCharging
      ? TimersCharging.basicCharging
      : TimersCharging.slowCharging;
    const time = Math.ceil((toCharge * (chargingSpeed / 1000)) / 60);
    return `${time} min`;
  };

  const unchargingTime = () => {
    const time = Math.ceil(
      (battery * TimersUncharging.basicUncharging) / 1000 / 60
    );

    if (time > 60) {
      return `1 godz. ${time - 60} min.`;
    } else if (time === 60) {
      return "1 godz.";
    } else {
      return `${time} min.`;
    }
  };

  return (
    <StyledBatteryStatus>
      {(battery === 100 || (isBatteryProtection && battery > 85)) &&
      isCharging ? (
        <StyledTime>Pełne naładowanie</StyledTime>
      ) : (
        <>
          <StyledTime>
            {isCharging ? chargingTime() : unchargingTime()}
          </StyledTime>
          <StyledTimeDescription>
            {isCharging ? "do pełnego naładowania" : "pozostałego czasu"}
          </StyledTimeDescription>
        </>
      )}

      <StyledLittleDescription>
        Dostępne {battery}%<p></p>
        <StyledBar>
          <StyledGreenLane progres={battery} />
        </StyledBar>
        <StyledBarBorder />
        {isCharging
          ? "Ładowarka podłączona"
          : "Pełne naładowanie starcza na około 1 godz. 7 min."}
      </StyledLittleDescription>
    </StyledBatteryStatus>
  );
}

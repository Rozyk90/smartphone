import styled from "styled-components";
import { useAppSelector } from "../../../../../redux/hooks";

import ChargingDescription from "../../../../functionalities/battery/chargingDescription";
import ChargingSpiner from "../../../../functionalities/battery/chargingSpiner";


const StyledScreenNone = styled.div`
  background: #1b1b1b;
  height: 100%;
`

const StyledDescriptionPosition = styled.div`
  padding-top: 450px;
`;
const StyledSpinerPosition = styled.div`
  padding-top: 200px;
`;

export default function ScreenNone() {
  const {isOn,isRestarting} = useAppSelector((state) => state.basicStates);
  const isCharging = useAppSelector((state) => state.battery.isCharging);


  return (
    <StyledScreenNone>
      {isOn && isCharging && !isRestarting && (
        <StyledDescriptionPosition>
          <ChargingDescription />
        </StyledDescriptionPosition>
      )}
      {!isOn && isCharging && !isRestarting && (
        <StyledSpinerPosition>
          <ChargingSpiner />
        </StyledSpinerPosition>
      )}
    </StyledScreenNone>
  );
}

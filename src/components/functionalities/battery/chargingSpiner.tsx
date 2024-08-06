import styled from "styled-components";

import { useAppSelector } from "../../../redux/hooks";

import BoltIcon from "@mui/icons-material/Bolt";

const StyledChargingSpiner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledInfoPlace = styled.div`
  position: absolute;
  left: 115px;
  width: 80px;
  height: 80px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 160px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #46e427 96%, #0000) top/15px 16px
      no-repeat,
    conic-gradient(#0000 30%, #46e427);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 16px), #000 0);
  animation: spin 2s infinite linear;

  @keyframes spin {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const StyledBatteryLvl = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBatteryNumber = styled.div`
  font-size: 30px;
  color: white;
  display: flex;
  align-items: flex-end;
`;

const StyledBatterySign = styled.div`
  font-size: 15px;
  color: white;
  margin-top: 13px;
  margin-left: 2px;
`;

export default function ChargingSpiner() {
  const battery = useAppSelector((state) => state.battery.battery);

  return (
    <StyledChargingSpiner>
      <Spinner></Spinner>
      <StyledInfoPlace>
        <BoltIcon sx={{ color: "white", fontSize: "40px" }} />
        <StyledBatteryLvl>
          <StyledBatteryNumber>{battery}</StyledBatteryNumber>
          <StyledBatterySign>%</StyledBatterySign>
        </StyledBatteryLvl>
      </StyledInfoPlace>
    </StyledChargingSpiner>
  );
}

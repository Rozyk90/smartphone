import styled from "styled-components";
import BtnBattery from "./elements/btnBattery";
import BtnScreen from "./elements/btnScreen";
import BtnSound from "./elements/btnSound";
import BtnApps from "./elements/btnApps";
import BtnBackground from "./elements/btnBackground";

const StyledSettings = styled.div`
  background: #f1f1f1;
  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;
const StyledSettingsTitle = styled.div`
  height: 300px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #474747;
  font-size: 2.5rem;
`;

export default function ScreenSettings() {
  return (
    <StyledSettings>
      <StyledSettingsTitle>Ustawienia</StyledSettingsTitle>
      <BtnBattery />
      <BtnScreen />
      <BtnSound />
      <BtnApps />
      <BtnBackground />
    </StyledSettings>
  );
}

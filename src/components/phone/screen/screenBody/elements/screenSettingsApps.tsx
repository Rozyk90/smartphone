import styled from "styled-components";
import SettingsTitle from "./settingsTitle";

const StyledApps = styled.div`
      background: #f1f1f1;
  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

`


export default function ScreenSettingsApps() {

  
  
    return (
      <StyledApps>
        <SettingsTitle title="Aplikacje"/>
      </StyledApps>
    );
  }
  
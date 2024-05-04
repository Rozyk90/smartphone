import styled from "styled-components";
import SettingsTitle from "./settingsTitle";

const StyledSounds = styled.div`
        background: ${prop => prop.theme.backgrounds.primary};

  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

`


export default function ScreenSettingsSounds() {

  
  
    return (
      <StyledSounds>
       <SettingsTitle title="Dźwięki i wibracja"/>
      </StyledSounds>
    );
  }
  
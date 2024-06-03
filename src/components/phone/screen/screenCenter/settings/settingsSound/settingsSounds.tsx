import styled from "styled-components";

import Title from "../../../../../../globalComponents/title";
import SoundMode from "./elements/soundMode";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
`;

export default function SettingsSounds() {
  return (
    <StyledBody>
      <Title title="Dźwięki i wibracja" />
      <SoundMode/>
    </StyledBody>
  );
}

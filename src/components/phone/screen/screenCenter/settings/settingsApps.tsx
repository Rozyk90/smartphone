import styled from "styled-components";

import TitleWithBack from "../../../../../globalComponents/titleWithBack";
import { useAppDispatch } from "../../../../../redux/hooks";

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

export default function SettingsApps() {
  return (
    <StyledBody>
      <TitleWithBack title="Aplikacje" />
    </StyledBody>
  );
}

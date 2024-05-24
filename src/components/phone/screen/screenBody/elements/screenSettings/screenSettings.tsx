import styled from "styled-components";

import CardSettings from "../../../../../../globalComponents/cardSettings";
import { cards } from "./elements/cards";

const StyledSettings = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
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
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 2.5rem;
`;

export default function ScreenSettings() {
  return (
    <StyledSettings>
      <StyledSettingsTitle>Ustawienia</StyledSettingsTitle>
      {cards.map((card,id) => (
        <CardSettings
          key={card.title + id}
          title={card.title}
          description={card.description}
          Icon={card.Icon}
          iconBG={card.iconBG}
          enumScreen={card.enumScreen}
        />
      ))}
    </StyledSettings>
  );
}

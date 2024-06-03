import styled from "styled-components";

import BtnCardIcon from "../../../../../../globalComponents/btnCardIcon";
import { cards } from "./elements/cards";

const StyledSettings = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 18px;
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
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 2.5rem;
`;

export default function SettingsMain() {
  return (
    <StyledSettings>
      <StyledSettingsTitle>Ustawienia</StyledSettingsTitle>
      {cards.map((card, id) => (
        <BtnCardIcon
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

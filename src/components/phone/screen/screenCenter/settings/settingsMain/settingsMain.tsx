import styled from "styled-components";

import BtnCardIcon from "../../../../../../globalComponents/btnCardIcon";

import TitleLarge from "../../../../../../globalComponents/titleLarge";
import { cards } from "./elements/cards";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 0px 10px;
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

export default function SettingsMain() {
  return (
    <StyledBody>
      <TitleLarge title="Ustawienia" description={null}/>
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
    </StyledBody>
  );
}

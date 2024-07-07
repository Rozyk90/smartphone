import styled from "styled-components";
import { useState } from "react";

import ContactsHistory from "./screens/contactsHistory";
import ContactsList from "./screens/contactsList";
import Keyboard from "./screens/keyboard";
import useSound from "../../../../../customHooks/useSound";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 540px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

enum btnEnum {
  keyboard = "Klawiatura",
  contactsHistory = "Ostatnie",
  contactsList = "Kontakty",
}

const StyledBtnsArea = styled.div`
  padding-bottom: 10px;
  width: 310px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 28px;
  left: 0px;
  background: ${(prop) => prop.theme.backgrounds.primary};
`;

const StyledBtnBox = styled.div<{ $selected: boolean }>`
  width: 80px;
  display: flex;
  justify-content: space-around;
  align-items: end;
  border-bottom: 3px solid
    ${(prop) => (prop.$selected ? prop.theme.colors.primary : "transparent")};
`;

const StyledBtn = styled.button<{ $selected: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bolder;
  height: 30px;
  color: ${(prop) =>
    prop.$selected ? prop.theme.colors.primary : prop.theme.fonts.secondary};
`;

export default function Contacts() {
  const [selectedPage, setSelectedPage] = useState<btnEnum>(
    btnEnum.contactsHistory
  );
  const { btnSoundEffect } = useSound();

  return (
    <StyledBody>
      {selectedPage === btnEnum.keyboard && <Keyboard />}
      {selectedPage === btnEnum.contactsHistory && <ContactsHistory />}
      {selectedPage === btnEnum.contactsList && <ContactsList />}

      <StyledBtnsArea>
        <StyledBtnBox $selected={selectedPage === btnEnum.keyboard}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.keyboard);
            }}
            $selected={selectedPage === btnEnum.keyboard}
          >
            {btnEnum.keyboard}
          </StyledBtn>
        </StyledBtnBox>{" "}
        <StyledBtnBox $selected={selectedPage === btnEnum.contactsHistory}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.contactsHistory);
            }}
            $selected={selectedPage === btnEnum.contactsHistory}
          >
            {btnEnum.contactsHistory}
          </StyledBtn>
        </StyledBtnBox>
        <StyledBtnBox $selected={selectedPage === btnEnum.contactsList}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.contactsList);
            }}
            $selected={selectedPage === btnEnum.contactsList}
          >
            {btnEnum.contactsList}
          </StyledBtn>
        </StyledBtnBox>
      </StyledBtnsArea>
    </StyledBody>
  );
}

import styled from "styled-components";
import Contacts from "./elements/contacts";
import { useState } from "react";
import CallList from "./elements/callList";
import Keyboard from "./elements/keyboard";
import useSound from "../../../../../customHooks/useSound";

import { mapCallsByDay, arrHistory } from "./elements/arrays";

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
  callList = "Ostatnie",
  contacts = "Kontakty",
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

export default function AppContacts() {
  const [selectedPage, setSelectedPage] = useState<btnEnum>(btnEnum.callList);
  const { btnSoundEffect } = useSound();

  return (
    <StyledBody>
      {selectedPage === btnEnum.keyboard && <Keyboard />}
      {selectedPage === btnEnum.contacts && <Contacts />}
      {selectedPage === btnEnum.callList && <CallList />}

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
        </StyledBtnBox>
        <StyledBtnBox $selected={selectedPage === btnEnum.callList}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.callList);
            }}
            $selected={selectedPage === btnEnum.callList}
          >
            {btnEnum.callList}
          </StyledBtn>
        </StyledBtnBox>
        <StyledBtnBox $selected={selectedPage === btnEnum.contacts}>
          <StyledBtn
            onMouseDown={() => {
              btnSoundEffect();
            }}
            onClick={() => {
              setSelectedPage(btnEnum.contacts);
            }}
            $selected={selectedPage === btnEnum.contacts}
          >
            {btnEnum.contacts}
          </StyledBtn>
        </StyledBtnBox>
      </StyledBtnsArea>
    </StyledBody>
  );
}

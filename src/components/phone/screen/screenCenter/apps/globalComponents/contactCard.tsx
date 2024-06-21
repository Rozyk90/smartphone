import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { generateRandomGradient } from "../elements/arrays";
import useSound from "../../../../../../customHooks/useSound";
import HiddenElement from "./HiddenElement";

const StyledBody = styled.div<{ $large: boolean }>`
  border-radius: 16px;
  background: ${(prop) => prop.theme.colors.background};
  height: ${(p) => (p.$large ? "132px" : "60px")};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
`;

const StyledInfoBar = styled.button`
  background: ${(prop) => prop.theme.colors.background};
  border: none;
  border-radius: 16px;
  width: 100%;
  height: 55px;
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
`;

const StyledLogo = styled.div<{ $gradient: string }>`
  border-radius: 50%;
  background: ${(prop) => prop.$gradient};
  height: 40px;
  width: 40px;
  margin-left: 10px;
  color: ${(prop) => prop.theme.colors.onPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const StyledName = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 1rem;
`;

type Props = {
  name: string;
  number: string;
  fnToDo: () => void;
  selected: boolean;
};

export default function ContactCardBtn({
  name,
  number,
  fnToDo,
  selected,
}: Props) {
  const [gradient, setGradient] = useState("");
  const { btnSoundEffect } = useSound();

  useEffect(() => {
    const newGradient = generateRandomGradient();
    setGradient(newGradient);
  }, []);
  return (
    <StyledBody $large={selected}>
      <StyledInfoBar onMouseDown={() => btnSoundEffect()} onClick={fnToDo}>
        <StyledLogo $gradient={gradient}>{name[0]}</StyledLogo>
        <StyledName>{name}</StyledName>
      </StyledInfoBar>
      {selected && <HiddenElement phoneNumber={number} />}



    </StyledBody>
  );
}

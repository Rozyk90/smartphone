import styled from "styled-components";
import { useState } from "react";

import useUtilities from "../../../../../../../customHooks/useUtilities";

import { conversations } from "../test";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.colors.background};
  border-radius: 14px;
  padding: 14px;
  min-height: 40px;
  display: flex;
  gap: 10px;
`;

const StyledIconArea = styled.div`
  width: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div<{ $bg: string }>`
  background: ${(prop) => prop.$bg};
  border-radius: 50%;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTxtArea = styled.div`
  width: 100%;
`;

const StyledTitle = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 1.2rem;
`;
const StyledMessage = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 0.7rem;
`;

const StyledTimeArea = styled.div`
  width: 40px;
  min-width: 40px;
  text-align: center;
  font-size: 0.8rem;

`;



export default function BtnCardSms() {
  const { generateRandomGradient } = useUtilities();
  const [gradient] = useState(generateRandomGradient());

  return (
    <StyledBody>
      <StyledIconArea>
        <StyledIcon $bg={gradient}>K</StyledIcon>
      </StyledIconArea>
      <StyledTxtArea>
        <StyledTitle>Mama</StyledTitle>
        <StyledMessage>wiadomosc tekst elo</StyledMessage>
      </StyledTxtArea>

      <StyledTimeArea>
        13:12
      </StyledTimeArea>
    </StyledBody>
  );
}

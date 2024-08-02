import styled from "styled-components";

import { useAppDispatch } from "../../../../../../redux/hooks";

import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { CardProp } from "../settingsMain/elements/cards";

import useSound from "../../../../../../customHooks/useSound";
import useScreen from "../../../../../../customHooks/useScreen";

const StyledBtn = styled.button`
  background: ${(prop) => prop.theme.colors.background};
  border: none;
  border-radius: 14px;
  padding: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const StyledIconBackground = styled.div<{ $bg: string }>`
  background: ${(prop) => prop.$bg};
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(prop) => prop.theme.white};
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  font-size: 18px;
  color: ${(prop) => prop.theme.fonts.primary};
  display: flex;
`;

const StyledSubtitle = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 10px;
  display: flex;
  align-items: center;
`;

const StyledDot = styled.div`
  background: ${(prop) => prop.theme.fonts.secondary};
  height: 5px;
  width: 5px;
  border-radius: 50%;
  margin: 0px 4px;
`;

const StyledBox = styled.div`
  display: flex;
  align-items: center;
`;

export default function BtnCardIcon({
  title,
  description,
  iconBG,
  Icon,
  enumScreen,
}: CardProp) {
  const {pushCurrentScreen} = useScreen()
  const dispatch = useAppDispatch();
  const fn = () => {
    dispatch(setCurrentScreen(enumScreen));
    pushCurrentScreen()
  };
  const { btnSoundEffect } = useSound();

  return (
    <StyledBtn onClick={fn} onMouseDown={()=>btnSoundEffect()}>
      <StyledIconBackground $bg={iconBG}>
        <Icon fontSize="small" />
      </StyledIconBackground>

      <StyledDescription>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>
          {description.map((txt, id) => {
            return (
              <StyledBox key={id}>
                {id !== 0 && <StyledDot />}
                {txt}
              </StyledBox>
            );
          })}
        </StyledSubtitle>
      </StyledDescription>
    </StyledBtn>
  );
}

import styled from "styled-components";

import { useAppDispatch } from "../../../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import { CardProp } from "./cards";

const StyledCard = styled.button`
  border: none;
  background: ${prop => prop.theme.backgrounds.secondary};
  height: 60px;
  min-height: 60px;
  border-radius: 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const StyledIconBackground = styled.div<{ bg: string }>`
  background: ${(prop) => prop.bg};
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${prop => prop.theme.white};
  size: 5px;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${prop => prop.theme.fonts.primary};
  display: flex;
`;

const StyledSubtitle = styled.div`
  color: ${prop => prop.theme.fonts.secondary};
  font-size: 0.6rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledDot = styled.div`
  background: ${prop => prop.theme.fonts.secondary};
  height: 5px;
  width: 5px;
  border-radius: 50%;
`;

export default function Card({
  title,
  description,
  iconBG,
  Icon,
  enumScreen,
}: CardProp) {
  const dispatch = useAppDispatch();
  const fn = () => {
    dispatch(setCurrentScreen(enumScreen));
  };

  return (
    <StyledCard onClick={fn}>
      <StyledIconBackground bg={iconBG}>
        <Icon fontSize="small" />
      </StyledIconBackground>

      <StyledDescription>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>
          {description.map((txt, id) => {
            return (
              <>
                {id !== 0 && <StyledDot />}
                {txt}
              </>
            );
          })}
        </StyledSubtitle>
      </StyledDescription>
    </StyledCard>
  );
}

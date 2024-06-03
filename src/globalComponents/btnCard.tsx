import styled from "styled-components";

const StyledCardTitle = styled.button`
  background: ${(prop) => prop.theme.colors.background};
  border: none;
  border-radius: 14px;
  width: 100%;
  padding: 14px;
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
`;

const StyledTxtBox = styled.div`
  width: 200px;
  position: relative;
`;

const StyledElementTitle = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 18px;
`;

const StyledElementDescription = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
  font-size: 10px;
`;

export default function BtnCard({
  title,
  description,
  fnToDo,
}: {
  title: string;
  description: string | null;
  fnToDo: () => void;
}) {
  return (
    <StyledCardTitle onClick={fnToDo}>
      <StyledTxtBox>
        <StyledElementTitle>{title}</StyledElementTitle>
        {description ? (
          <StyledElementDescription>{description}</StyledElementDescription>
        ) : null}
      </StyledTxtBox>
    </StyledCardTitle>
  );
}

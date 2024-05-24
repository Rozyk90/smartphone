import styled from "styled-components";

const StyledCardTitle = styled.button`
  border: none;
  background: ${(prop) => prop.theme.colors.background};
  height: 60px;
  min-height: 60px;
  border-radius: 16px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(prop) => prop.theme.fonts.primary};
  font-size: 18px;
`;

export default function CardTitle({
  title,
  fnToDo,
}: {
  title: string;
  fnToDo: () => void;
}) {
  return <StyledCardTitle onClick={fnToDo}>{title}</StyledCardTitle>;
}

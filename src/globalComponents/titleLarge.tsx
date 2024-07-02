import styled from "styled-components";

const StyledTitleArea = styled.div`
  text-align: center;
  height: 200px;
`;

const StyledTitle = styled.div`
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 2rem;
  margin-top: 80px;
`;

const StyledDescription = styled.div`
  color: ${(prop) => prop.theme.fonts.secondary};
`;

type Prop = {
  title: string;
  description: string | null;
};

export default function TitleLarge({ title, description }: Prop) {
  return (
    <StyledTitleArea>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
    </StyledTitleArea>
  );
}

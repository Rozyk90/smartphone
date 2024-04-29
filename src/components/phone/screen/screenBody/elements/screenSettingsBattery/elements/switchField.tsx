import styled from "styled-components";
import Switch from "@mui/material/Switch";

const StyledElement = styled.button`
  border: none;
  background: #fcfcfc;
  min-height: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 16px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  text-align: left;
`;

const StyledTxtBox = styled.div`
  width: 200px;
  position: relative;
`;

const StyledElementTitle = styled.div`
  color: #000000;
  font-size: 18px;
`;

const StyledElementDescription = styled.div`
  color: #8d8d8d;
  font-size: 10px;
`;

interface Props {
  title: string;
  description: string | null;
  isActive: boolean;
  fn: () => void;
}

export default function SwitchField({
  title,
  description,
  isActive,
  fn,
}: Props) {
  return (
    <StyledElement>
      <StyledTxtBox>
        <StyledElementTitle>{title}</StyledElementTitle>
        {description ? (
          <StyledElementDescription>{description}</StyledElementDescription>
        ) : null}
      </StyledTxtBox>
      <Switch checked={isActive} onChange={fn} />
    </StyledElement>
  );
}

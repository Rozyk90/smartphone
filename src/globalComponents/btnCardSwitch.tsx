import styled from "styled-components";
import Switch from "@mui/material/Switch";
import useSound from "../customHooks/useSound";

const StyledCardSwitch = styled.div`
  background:  ${prop => prop.theme.colors.background};
  border: none;
  border-radius: 14px;
  max-width: 260px;
  padding: 14px;
  display: flex;
  align-items: center;
  text-align: left;
`;

const StyledTxtBox = styled.div`
  width: 200px;
  position: relative;
`;

const StyledElementTitle = styled.div`
  color: ${prop => prop.theme.fonts.primary};
  font-size: 18px;
`;

const StyledElementDescription = styled.div`
  color: ${prop => prop.theme.fonts.secondary};
  font-size: 10px;
`;

const StyledSwitch = styled(Switch)`
& .MuiSwitch-switchBase {
    &.Mui-checked {
      color: ${(props) => props.theme.colors.primary};
    }
    &.Mui-checked + .MuiSwitch-track {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

interface Props {
  title: string;
  description: string | null;
  isActive: boolean;
  fn: () => void;
}

export default function BtnCardSwitch({
  title,
  description,
  isActive,
  fn,
}: Props) {
  const { btnSoundEffect } = useSound();

  return (
    <StyledCardSwitch>
      <StyledTxtBox>
        <StyledElementTitle>{title}</StyledElementTitle>
        {description ? (
          <StyledElementDescription>{description}</StyledElementDescription>
        ) : null}
      </StyledTxtBox>
      <StyledSwitch checked={isActive} onChange={fn} onMouseDown={()=>btnSoundEffect()} />
    </StyledCardSwitch>
  );
}

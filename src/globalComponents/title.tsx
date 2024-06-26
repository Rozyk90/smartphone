import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import useScreen from "../customHooks/useScreen";
import useSound from "../customHooks/useSound";

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: ${(prop) => prop.theme.colors.primary};
  font-size: 20px;
  font-weight: bold;
`;
const StyledButton = styled(IconButton)`
  && {
    color: ${(prop) => prop.theme.colors.primary};
  }
`;

interface TitleProp {
  title: string;
}

export default function Title({ title }: TitleProp) {
  const {backToPreviousScreen} = useScreen()
  const {btnSoundEffect} = useSound()
  return (
    <StyledTitle>
      <StyledButton onMouseDown={()=>btnSoundEffect()} onClick={backToPreviousScreen} size="small">
        <ArrowBackIosRoundedIcon fontSize="small" />
      </StyledButton>
      {title}
    </StyledTitle>
  );
}

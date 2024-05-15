import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentScreen } from "../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../redux/reducers/screenParts/enumsScreen";

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: ${prop => prop.theme.primary};
  font-size: 20px;
  font-weight: bold;
`;
const StyledButton = styled(IconButton)`
  && {
    color: ${prop => prop.theme.primary};
  }
`;

interface TitleProp {
  title: string;
  fnToDo:()=>void;
}

export default function SettingsTitle({ title,fnToDo }: TitleProp) {



  return (
    <StyledTitle>
      <StyledButton onClick={fnToDo} size="small">
        <ArrowBackIosRoundedIcon fontSize="small" />
      </StyledButton>
      {title}
    </StyledTitle>
  );
}

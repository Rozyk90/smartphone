import styled from "styled-components";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setCurrentScreen } from "../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../redux/reducers/screenParts/enumsScreen";

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: ${prop => prop.theme.fonts.primary};
  font-size: 20px;
  font-weight: bold;
`;
const StyledButton = styled(IconButton)`
  && {
    color: ${prop => prop.theme.fonts.primary};
  }
`;

interface TitleProp {
  title: string;
}

export default function SettingsTitle({ title }: TitleProp) {
  const dispatch = useAppDispatch();
  const backBtn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettings));
  };

  return (
    <StyledTitle>
      <StyledButton onClick={backBtn} size="small">
        <ArrowBackIosRoundedIcon fontSize="small" />
      </StyledButton>
      {title}
    </StyledTitle>
  );
}

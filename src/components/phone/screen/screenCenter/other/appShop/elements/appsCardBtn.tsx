import styled from "styled-components";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../redux/hooks";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { RenderIconSmall } from "../../../../../../icons/renderIcon";
import { enumIcons } from "../../../../../../icons/enumsIcon";
import { screenGridAddIcon } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import useSound from "../../../../../../../customHooks/useSound";

const StyledAppCard = styled.button`
  border: 2px solid rgb(229, 52, 19);
  border-radius: 10px;
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 70px;
  min-height: 70px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: border-radius 0.5s;
  &:hover {
    border-radius: 25px;
  }
`;

const StyledAppLogo = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAppTitle = styled.div<{ $darkMode: boolean }>`
  height: 60px;
  width: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(prop) => (prop.$darkMode ? "rgb(229, 52, 19)" : "black")};
  text-transform: capitalize;
`;

const StyledAppStatusIcon = styled.div<{ $darkMode: boolean }>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  && {
    color: ${(prop) => (prop.$darkMode ? "rgb(229, 52, 19)" : "black")};
  }
`;

interface App {
  title: enumIcons;
  category: string;
  core: boolean;
}

export default function AppsCardBtn(app: App) {
  const screenGrid = useAppSelector((state) => state.screen.center.screenGrid);
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();
  const addIcon = (newIcon: enumIcons) => {
    dispatch(screenGridAddIcon(newIcon));
  };
  return (
    <StyledAppCard
      onMouseDown={() => btnSoundEffect()}
      onClick={() =>
        screenGrid.includes(app.title) ? null : addIcon(app.title)
      }
      key={app.title}
    >
      <StyledAppLogo>
        <RenderIconSmall icon={app.title} />
      </StyledAppLogo>
      <StyledAppTitle $darkMode={darkMode}>{app.title}</StyledAppTitle>
      <StyledAppStatusIcon $darkMode={darkMode}>
        {screenGrid.includes(app.title) ? (
          <FileDownloadDoneIcon />
        ) : (
          <FileDownloadRoundedIcon />
        )}
      </StyledAppStatusIcon>
    </StyledAppCard>
  );
}

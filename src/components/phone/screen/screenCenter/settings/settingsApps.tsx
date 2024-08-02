import styled from "styled-components";

import TitleWithBack from "../../../../../globalComponents/titleWithBack";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useSound from "../../../../../customHooks/useSound";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { RenderIconSmall } from "../../../../icons/renderIcon";
import { screenGridDelIcon } from "../../../../../redux/reducers/screenParts/screenCenter";
import { enumCategories } from "../../../../../redux/reducers/apps";
import { enumIcons } from "../../../../icons/enumsIcon";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 600px;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000003e;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

const StyledAppCard = styled.button`
  border: none;
  border-radius: 10px;
  background: ${(prop) => prop.theme.colors.background};
  min-height: 70px;
  max-height: 70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

const StyledAppLogo = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAppTitle = styled.div`
  height: 60px;
  width: 165px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

const StyledAppStatusIcon = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SettingsApps() {
  const { appsList, openCategory } = useAppSelector((state) => state.apps);
  const { screenGrid } = useAppSelector((state) => state.screen.center);
  const dispatch = useAppDispatch();
  const { btnSoundEffect } = useSound();

  const installedApps = appsList.filter((app) =>
    screenGrid.includes(app.title)
  );

  const removeApp = (title: enumIcons, category: enumCategories) => {
    if (category !== enumCategories.Basic) {
      dispatch(screenGridDelIcon(title));
    }
  };

  return (
    <StyledBody>
      <TitleWithBack title="Aplikacje" />

      {installedApps.map((app) => (
        <StyledAppCard
          onMouseDown={() => btnSoundEffect()}
          onClick={() => removeApp(app.title, app.category)}
          key={app.title}
        >
          <StyledAppLogo>
            <RenderIconSmall icon={app.title} />
          </StyledAppLogo>
          <StyledAppTitle>{app.title}</StyledAppTitle>
          <StyledAppStatusIcon>
            {app.category === enumCategories.Basic ? (
              <GppBadRoundedIcon />
            ) : (
              <DeleteRoundedIcon />
            )}
          </StyledAppStatusIcon>
        </StyledAppCard>
      ))}
    </StyledBody>
  );
}

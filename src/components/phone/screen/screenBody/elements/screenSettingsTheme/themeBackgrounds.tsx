import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { setBg } from "../../../../../../redux/reducers/theme";
import Title from "../../../../../../globalComponents/title";
import Paggination from "../../../../../../globalComponents/paggination";
import backgrounds from "../../../../../../theme/backgrounds";
import ScreenBG from "./screens/screenBG";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";

const StyledThemeBackgrounds = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const StyledTitle = styled.div`
  color: ${(prop) => prop.theme.fonts.primary};
  font-weight: 600;
  margin: 10px 0px;
`;

const StyledCard = styled.div`
  background: ${(prop) => prop.theme.backgrounds.secondary};
  margin-top: 20px;
  padding: 10px;
  border-radius: 16px;
`;

const StyledScreens = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px;
`;

export default function SettingsThemeBG() {
  const [pageGradients, setPageGradients] = useState(1);
  const [pagePhotos, setPagePhotos] = useState(1);
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const nextPageColors = () => {
    if (pageGradients < backgrounds.gradients.length / 4)
      setPageGradients(pageGradients + 1);
  };
  const previousPageColors = () => {
    if (pageGradients > 1) setPageGradients(pageGradients - 1);
  };
  // ========================================================
  const nextPagePhotos = () => {
    if (pagePhotos < backgrounds.photos.length / 4)
      setPagePhotos(pagePhotos + 1);
  };
  const previousPagePhotos = () => {
    if (pagePhotos > 1) setPagePhotos(pagePhotos - 1);
  };
  // ==========================================================

  interface BGprops {
    group: "gradients" | "photos";
    id: number;
  }

  const setNewBg = ({ group, id }: BGprops) => {
    dispatch(setBg({ group, id }));
  };
  // ==========================================================

  type arrProp = {
    id: number;
    group: "gradients" | "photos";
    content: string;
  };

  const render = (arr: arrProp[], page: number) => {
    const range = setRange(page);
    const screens = arr.slice(range.start, range.end);
    const render = screens.map((bg) => (
      <ScreenBG
        key={bg.id}
        group={bg.group}
        id={bg.id}
        darkMode={darkMode}
        setNewBg={() => setNewBg({ group: bg.group, id: bg.id })}
      />
    ));
    return render;
  };

  // =====================================================

  return (
    <StyledThemeBackgrounds>
      <Title title="Tapety" />

      <StyledCard>
        <StyledTitle>Kolory</StyledTitle>
        <StyledScreens>
          {render(backgrounds.gradients, pageGradients)}
        </StyledScreens>

        <Paggination
          page={pageGradients}
          length={backgrounds.gradients.length}
          fnNextPage={nextPageColors}
          fnPreviousPage={previousPageColors}
        />
      </StyledCard>

      {/* ======================================================================= */}

      <StyledCard>
        <StyledTitle>Zdjęcia</StyledTitle>
        <StyledScreens>{render(backgrounds.photos, pagePhotos)}</StyledScreens>
        <Paggination
          page={pagePhotos}
          length={backgrounds.photos.length}
          fnNextPage={nextPagePhotos}
          fnPreviousPage={previousPagePhotos}
        />
      </StyledCard>
    </StyledThemeBackgrounds>
  );
}

function setRange(page: number) {
  switch (page) {
    case 1:
      return { start: 0, end: 4 };
    case 2:
      return { start: 4, end: 8 };
    case 3:
      return { start: 8, end: 12 };
    case 4:
      return { start: 12, end: 16 };
    case 5:
      return { start: 16, end: 20 };
    default:
      return { start: 0, end: 4 };
  }
}

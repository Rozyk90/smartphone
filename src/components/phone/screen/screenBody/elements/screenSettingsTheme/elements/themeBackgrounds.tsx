import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import theme, { setBg } from "../../../../../../../redux/reducers/theme";

import SettingsTitle from "../../../../../../../componentsGlobal/settingsTitle";
import Paggination from "../../../../../../../componentsGlobal/paggination";
import { backgrounds } from "../../../../../../../themeBase";

const StyledThemeBackgrounds = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
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
  gap: 10px;
`;

const StyledScreens = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0px;
`;

interface StyledBGprops {
  $group: "gradients" | "photos";
  $id: number;
}

const StyledScreen = styled.button<StyledBGprops>`
  cursor: pointer;
  border: none;
  min-width: 60px;
  height: 120px;
  border-radius: 10px;
  background: ${({ $group, $id }) =>
    $group === "gradients"
      ? backgrounds.gradients[$id].content
      : `url(${backgrounds.photos[$id].content}) center/cover`};
`;

export default function ThemeBackgrounds({
  setBackgrounds,
}: {
  setBackgrounds: () => void;
}) {
  const [pageGradients, setPageGradients] = useState(1);
  const [pagePhotos, setPagePhotos] = useState(1);
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
      <StyledScreen
        onClick={() => {
          setNewBg({ group: bg.group, id: bg.id });
        }}
        key={bg.id}
        $group={bg.group}
        $id={bg.id}
      />
    ));
    return render;
  };

  // =====================================================

  return (
    <StyledThemeBackgrounds>
      <SettingsTitle title="Tapety" fnToDo={setBackgrounds} />

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

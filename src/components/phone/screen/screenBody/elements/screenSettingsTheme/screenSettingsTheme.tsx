import styled from "styled-components";
import { useState } from "react";

import ThemeBasic from "./elements/themeBasic";
import ThemeBackgrounds from "./elements/themeBackgrounds";
import ThemeColors from "./elements/themeColors";

const StyledTheme = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

export default function ScreenTheme() {
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [showColors, setShowColors] = useState(false);

  return (
    <StyledTheme>
      {!showBackgrounds && !showColors && (
        <ThemeBasic
          setBackgrounds={() => setShowBackgrounds(true)}
          setColors={() => setShowColors(true)}
        />
      )}
      {showBackgrounds && (
        <ThemeBackgrounds setBackgrounds={() => setShowBackgrounds(false)} />
      )}
      {showColors && <ThemeColors setColors={() => setShowColors(false)} />}
    </StyledTheme>
  );
}

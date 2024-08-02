import { useAppSelector } from "../redux/hooks";
import { lightModeTheme, darkModeTheme, colors } from "../theme/theme";

const useTheme = () => {
  const { currentTheme, darkMode } = useAppSelector((state) => state.theme);

  const getTheme = () => {
    const baseTheme = darkMode ? darkModeTheme : lightModeTheme;
    const themeColors = colors[currentTheme];

    return {
      ...baseTheme,
      colors: {
        ...themeColors,
        background: darkMode
          ? themeColors.darkBackground
          : themeColors.background,
      },
    };
  };

  return { getTheme };
};

export default useTheme;

import { useAppSelector } from "../redux/hooks";
import { lightModeTheme, darkModeTheme, colors } from "../theme/theme";

const useTheme = () => {
  const { currentTheme, darkMode } = useAppSelector((state) => state.theme);

  const theme = () => {
    if (darkMode) {
      return { ...darkModeTheme, colors: colors[currentTheme] };
    } else {
      return { ...lightModeTheme, colors: colors[currentTheme] };
    }
  };

  return { theme };
};

export default useTheme;

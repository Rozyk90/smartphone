import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDarkModeOn, setDarkModeOff } from "../../redux/reducers/theme";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";

export default function AutoDarkMode() {
  const { darkModeAuto, darkMode } = useAppSelector((state) => state.theme);
  const currentScreen = useAppSelector(
    (state) => state.screen.center.currentScreen
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTime = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 22 || currentHour < 6) {
        if (!darkMode) {
          dispatch(setDarkModeOn());
        }
      } else {
        dispatch(setDarkModeOff());
      }
    };
    if (
      darkModeAuto &&
      currentScreen !== enumCurrentScreen.settingsScreen
    ) {
      checkTime();
    }
  });

  return null;
}

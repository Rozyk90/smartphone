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

  console.log("sprawdzam czy jest noc i zmienic dark mode");

  useEffect(() => {
    const checkTime = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 22 || currentHour < 6) {
        console.log("mamy noc");
        if (!darkMode) {
          dispatch(setDarkModeOn());
        }
      } else {
        dispatch(setDarkModeOff());
        console.log("jest dzień");
      }
    };
    if (
      darkModeAuto &&
      currentScreen !== enumCurrentScreen.screenSettingsScreen
    ) {
      checkTime();
      console.log("robie akcje oł jee");
    }
  });

  return null;
}

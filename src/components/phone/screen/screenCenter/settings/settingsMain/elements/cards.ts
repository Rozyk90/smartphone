import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";

import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import BatterySaverRoundedIcon from "@mui/icons-material/BatterySaverRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";

export interface CardProp {
  title: string;
  description: string[];
  Icon: React.ElementType;
  iconBG: string;
  enumScreen: enumCurrentScreen;
}

const cards: CardProp[] = [
  {
    title: "Aplikacje",
    description: ["Domyślne aplikacje", "Ustawienia aplikacji"],
    Icon: AppRegistrationRoundedIcon,
    iconBG: "#3976ff",
    enumScreen: enumCurrentScreen.settingsApps,
  },

  {
    title: "Tapeta i styl",
    description: ["Tapety", "Paleta kolorów"],
    Icon: InsertPhotoRoundedIcon,
    iconBG: "#eb5980",
    enumScreen: enumCurrentScreen.settingsTheme,
  },

  {
    title: "Wyświetlacz",
    description: ["Wygaszanie ekranu", "Ochrona wzroku"],
    Icon: LightModeRoundedIcon,
    iconBG: "#96ce09",
    enumScreen: enumCurrentScreen.settingsScreen,
  },
  {
    title: "Dźwięki i wibracja",
    description: ["Tryb dźwięku", "Dzwonek"],
    Icon: VolumeUpRoundedIcon,
    iconBG: "#6d74df",
    enumScreen: enumCurrentScreen.settingsSounds,
  },
  {
    title: "Bateria",
    description: ["Oszczędzanie energii", "Ładowanie"],
    Icon: BatterySaverRoundedIcon,
    iconBG: "#07b196",
    enumScreen: enumCurrentScreen.settingsBattery,
  },
];

export { cards };

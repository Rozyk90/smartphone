import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../redux/hooks";

import SettingsTitle from "../../../../../../../componentsGlobal/settingsTitle";
import CardTitle from "../../../../../../../componentsGlobal/cardTitle";
import { setCurrentScreen } from "../../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../../redux/reducers/screenParts/enumsScreen";
import ScreenPreview from "./screens/screenPreview";

type Props = {
  setBackgrounds: () => void;
  setColors: () => void;
};

export default function ThemeBasic({ setBackgrounds, setColors }: Props) {
  const dispatch = useAppDispatch();

  const backBtn = () => {
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettings));
  };

  return (
    <>
      <SettingsTitle title="Tapeta i styl" fnToDo={backBtn} />
      <ScreenPreview />
      <CardTitle title="Zmień tapety" fnToDo={setBackgrounds} />
      <CardTitle title="Palety kolorów" fnToDo={setColors} />
    </>
  );
}

import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import {
  setDarkModeAutoOff,
  setDarkModeAutoOn,
} from "../../../../../../redux/reducers/theme";

import {
  batteryDescriptionOn,
  batteryDescriptionOff,
} from "../../../../../../redux/reducers/battery";

import Title from "../../../../../../globalComponents/title";

import BtnCardSwitch from "../../../../../../globalComponents/btnCardSwitch";
import BtnCard from "../../../../../../globalComponents/btnCard";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";
import { reversingBoardPush } from "../../../../../../redux/reducers/screenParts/screenGeneral";
import { convertTime } from "./screenCountdown";
import SampleTheme from "./elements/sampleTheme";

const StyledBody = styled.div`
  background: ${(prop) => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  padding: 0px 10px;
  overflow: auto;
  display: flex;
  gap: 18px;
  flex-direction: column;
`;

export default function SettingsScreen() {
  const { currentScreen } = useAppSelector((state) => state.screen.center);
  const { countDownTimerSelected } = useAppSelector(
    (state) => state.screen.general
  );
  const { darkModeAuto } = useAppSelector((state) => state.theme);
  const isBatteryDescription = useAppSelector(
    (state) => state.battery.isBatteryDescription
  );
  const dispatch = useAppDispatch();

  const darkModeAutoFn = () => {
    dispatch(darkModeAuto ? setDarkModeAutoOff() : setDarkModeAutoOn());
  };

  const batteryDescription = () => {
    dispatch(
      isBatteryDescription ? batteryDescriptionOff() : batteryDescriptionOn()
    );
  };

  const openCountdown = () => {
    dispatch(reversingBoardPush(currentScreen));
    dispatch(setCurrentScreen(enumCurrentScreen.settingsScreenCountdown));
  };

  return (
    <StyledBody>
      <Title title="Wyświetlacz" />
      <SampleTheme />

      <BtnCardSwitch
        title="Automatyczny tryb ciemny"
        description="Włącz automatyczny tryb ciemny od 22:00 do 6:00, aby zmniejszyć zmęczenie oczu w nocy."
        isActive={darkModeAuto}
        fn={darkModeAutoFn}
      />
      <BtnCardSwitch
        title="Pokaż info. o ładowaniu"
        description="Pokazuj stan baterii i szacowany czas do pełnego naładowania, kiedy
          funkcja Always On Display jest wyłączona lub niewyswietlana."
        isActive={isBatteryDescription}
        fn={batteryDescription}
      />

      <BtnCard
        title="Wygaszenie ekranu"
        description={convertTime(countDownTimerSelected)}
        fnToDo={openCountdown}
      />
    </StyledBody>
  );
}

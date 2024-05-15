import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";

import {
  batteryDescriptionOff,
  batteryDescriptionOn,
  batteryFastChargingOff,
  batteryFastChargingOn,
  batteryProtectionOff,
  batteryProtectionOn,
  batteryValueOff,
  batteryValueOn,
} from "../../../../../../redux/reducers/battery";

import BatteryStatus from "./elements/batteryStatus";
import SwitchField from "../../../../../../componentsGlobal/switchField";
import SettingsTitle from "../../../../../../componentsGlobal/settingsTitle";
import { setCurrentScreen } from "../../../../../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../../../../../redux/reducers/screenParts/enumsScreen";

const StyledScreenBattery = styled.div`
  background: ${prop => prop.theme.backgrounds.primary};
  height: 100%;
  max-height: 600px;
  overflow: auto;
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`;

export default function ScreenSettingsBattery() {
  const {
    isBatteryProtection,
    isFastCharging,
    isShowingValue,
    isBatteryDescription,
  } = useAppSelector((state) => state.battery);

  const dispatch = useAppDispatch();

  const backBtn = () =>{
    dispatch(setCurrentScreen(enumCurrentScreen.screenSettings))
  }

  const batteryProtection = () => {
    isBatteryProtection
      ? dispatch(batteryProtectionOff())
      : dispatch(batteryProtectionOn());
  };
  const batteryValue = () => {
    isShowingValue ? dispatch(batteryValueOff()) : dispatch(batteryValueOn());
  };
  const batteryFastCharging = () => {
    isFastCharging
      ? dispatch(batteryFastChargingOff())
      : dispatch(batteryFastChargingOn());
  };
  const batteryDescription = () => {
    isBatteryDescription
      ? dispatch(batteryDescriptionOff())
      : dispatch(batteryDescriptionOn());
  };

  const switches = [
    {
      title: "Ochrona baterii",
      description:
        " W celu wydłużenia żywotności baterii ogranicz maksymalne naładowanie do 85%",
      isActive: isBatteryProtection,
      fn: batteryProtection,
    },
    {
      title: "Pokaż naład. baterii w %",
      description: null,
      isActive: isShowingValue,
      fn: batteryValue,
    },
    {
      title: "Szybkie ładowanie",
      description: null,
      isActive: isFastCharging,
      fn: batteryFastCharging,
    },
    {
      title: "Pokaż info. o ładowaniu",
      description: `Pokazuj stan baterii i szacowany czas do pełnego naładowania, kiedy
        funkcja Always On Display jest wyłączona lub niewyswietlana.`,
      isActive: isBatteryDescription,
      fn: batteryDescription,
    },
  ];

  return (
    <StyledScreenBattery>
      <SettingsTitle title="Bateria" fnToDo={backBtn} />

      <BatteryStatus />

      {switches.map((x) => (
        <SwitchField
          key={x.title}
          title={x.title}
          description={x.description}
          isActive={x.isActive}
          fn={x.fn}
        />
      ))}
    </StyledScreenBattery>
  );
}

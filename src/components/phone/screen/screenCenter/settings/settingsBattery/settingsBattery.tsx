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
import BtnCardSwitch from "../../../../../../globalComponents/btnCardSwitch";
import Title from "../../../../../../globalComponents/title";

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

export default function SettingsBattery() {
  const {
    isBatteryProtection,
    isFastCharging,
    isShowingValue,
    isBatteryDescription,
  } = useAppSelector((state) => state.battery);

  const dispatch = useAppDispatch();

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
    <StyledBody>
      <Title title="Bateria" />

      <BatteryStatus />

      {switches.map((x) => (
        <BtnCardSwitch
          key={x.title}
          title={x.title}
          description={x.description}
          isActive={x.isActive}
          fn={x.fn}
        />
      ))}
    </StyledBody>
  );
}

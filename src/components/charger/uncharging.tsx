import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { phoneTurnOff } from "../../redux/reducers/basicStates";
import { batteryUpdate } from "../../redux/reducers/battery";
import { screenTurnOff } from "../../redux/reducers/screenParts/screenGeneral";

import { TimersUncharging } from "./timers";
import useScreen from "../../customHooks/useScreen";
import useModal from "../../customHooks/useModal";
import { setCurrentScreen } from "../../redux/reducers/screenParts/screenCenter";
import { enumCurrentScreen } from "../../redux/reducers/screenParts/enumsScreen";

export default function Uncharging() {
  const dispatch = useAppDispatch();
  const { isCharging, battery } = useAppSelector((state) => state.battery);
  const { isOn } = useAppSelector((state) => state.basicStates);
  const { isScreenActive } = useAppSelector((state) => state.screen.general);

  const {screenOff} = useScreen()
  const {modalOff} = useModal()

  useEffect(() => {
    if (!isCharging && battery > 0) {
      let timer = TimersUncharging.basicUncharging;

      if (!isOn) {
        timer = TimersUncharging.slowUncharging;
      } else if (battery > 0) {
        isScreenActive
          ? (timer = TimersUncharging.fastUncharging)
          : (timer = TimersUncharging.basicUncharging);
      }

      const unchargeBattery = () => {
        dispatch(batteryUpdate(battery - 1));
      };

      if (battery > 0) {
        const clock = setTimeout(unchargeBattery, timer);
        return () => clearTimeout(clock);
      }
    }

    if (battery === 0&&isOn) {
      dispatch(phoneTurnOff())
      screenOff()
      modalOff()
      dispatch(setCurrentScreen(enumCurrentScreen.screenTurnOffAnimation))
    }

  }, [battery, isCharging, isOn]);

  return <></>;
}

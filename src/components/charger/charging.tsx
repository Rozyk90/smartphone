import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { batteryUpdate } from "../../redux/reducers/battery";

import { TimersCharging } from "./timers";

export default function Charging() {
  const dispatch = useAppDispatch();
  const { isCharging, battery, isFastCharging, isBatteryProtection } =
    useAppSelector((state) => state.battery);
  const { isOn } = useAppSelector((state) => state.basicStates);
  const {isScreenActive}= useAppSelector(state => state.screen.general)
  useEffect(() => {
    if (isCharging) {
      let timer = TimersCharging.basicCharging;
      if (!isOn) {
        timer = TimersCharging.fastCharging;
      } else if (isFastCharging) {
        isScreenActive
          ? (timer = TimersCharging.basicCharging)
          : (timer = TimersCharging.fastCharging);
      } else {
        isScreenActive
          ? (timer = TimersCharging.slowCharging)
          : (timer = TimersCharging.basicCharging);
      }

      const chargeBattery = () => {
        dispatch(batteryUpdate(battery + 1));
      };

      if (
        (isBatteryProtection && battery < 85) ||
        (!isBatteryProtection && battery < 100)
      ) {
        const clock = setTimeout(chargeBattery, timer);
        return () => clearTimeout(clock);
      }
    }
  }, [
    battery,
    isCharging,
    isScreenActive,
    isOn,
    isFastCharging,
    isBatteryProtection,
  ]);

  return <></>;
}

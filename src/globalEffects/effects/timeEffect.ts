import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useDate from "../../customHooks/useDate";
import {
  enumCurrentModal,
  modalTurnOn,
  setAlarmData,
  setCurrentModal,
} from "../../redux/reducers/modal";
import { timerReset } from "../../redux/reducers/clock/timer";
import { alarmTurnOff } from "../../redux/reducers/clock/alarm";

export default function TimeEffect() {
  const { getPolishTime, getUnixTime } = useDate();
  const [time, setTime] = useState(getUnixTime());
  const [usedAlarmIds, setUsedAlarmIds] = useState<number[]>([]);
  const [currentMin, setCurrentMin] = useState<null | string>(null);

  const { isOn } = useAppSelector((state) => state.basicStates);
  const { isModalActive } = useAppSelector((state) => state.modal);
  const { isRunning, unixtimeWhenRing, breaks } = useAppSelector(
    (state) => state.clock.timer
  );
  const { alarms } = useAppSelector((state) => state.clock.alarm);

  const dispatch = useAppDispatch();
  // ===============================================================================

  const hour = getPolishTime(time).hours;
  const min = getPolishTime(time).minutes;
  const dayName = getPolishTime(time).dayName;
  const breaksTime = breaks.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const activeAlarms = alarms.filter((alarm) => alarm.active);
  const numbersToEdit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // ===============================================================================

  useEffect(() => {
    if (min !== currentMin) {
      setUsedAlarmIds([]);
      setCurrentMin(min);
    }

    if (activeAlarms && isOn && !isModalActive) {
      for (const alarm of activeAlarms) {
        const alarmHour = numbersToEdit.includes(alarm.hour)
          ? `0${alarm.hour}`
          : alarm.hour.toString();
        const alarmMinute = numbersToEdit.includes(alarm.minute)
          ? `0${alarm.minute}`
          : alarm.minute.toString();
        const alarmId = alarm.unixtimeId;

        if (!usedAlarmIds.includes(alarmId)) {
          if (alarm.days.includes(dayName)) {
            if (alarmHour === hour && alarmMinute === min) {
              dispatch(setAlarmData({alarmType:'alarm',title:alarm.title,description:null}))
              dispatch(modalTurnOn());
              dispatch(setCurrentModal(enumCurrentModal.modalAlarmRinging));
              setUsedAlarmIds((prevIds) => [...prevIds, alarmId]);
            }
          } else if (alarm.days.length === 0) {
            if (alarmHour === hour && alarmMinute === min) {
              dispatch(setAlarmData({alarmType:'alarm',title:alarm.title,description:null}))
              dispatch(modalTurnOn());
              dispatch(setCurrentModal(enumCurrentModal.modalAlarmRinging));
              dispatch(alarmTurnOff(alarmId));
              setUsedAlarmIds((prevIds) => [...prevIds, alarmId]);
            }
          }
        }
      }
    }
  }, [time]);

  // ===============================================================================

  useEffect(() => {
    if (getUnixTime() > unixtimeWhenRing + breaksTime && isRunning) {
      dispatch(setCurrentModal(enumCurrentModal.modalAlarmRinging));
      dispatch(modalTurnOn());
      dispatch(timerReset());
    }
  }, [time, unixtimeWhenRing, isRunning, breaksTime]);

  // ===============================================================================

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setTime(getUnixTime());
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [getUnixTime]);

  return null;
}

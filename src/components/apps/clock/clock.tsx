import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useDate from "../../../customHooks/useDate";
import {
  enumCurrentModal,
  modalTurnOn,
  setCurrentModal,
} from "../../../redux/reducers/modal";
import { timerReset } from "../../../redux/reducers/clock/timer";
import { enumCurrentScreen } from "../../../redux/reducers/screenParts/enumsScreen";

const StyledClock = styled.div``;

const StyledClockSmall = styled.div`
  font-size: 12px;
`;
const StyledClockLarge = styled.div`
  font-size: 45px;
  color: ${(prop) => prop.theme.white};
`;

export enum enumClockSizes {
  small = "small",
  large = "large",
}

type Sizes = {
  size: enumClockSizes;
};

export default function Clock(props: Sizes) {
  const { getPolishTime, getUnixTime } = useDate();
  const [time, setTime] = useState(getUnixTime());
  const [usedAlarmIds, setUsedAlarmIds] = useState<number[]>([]);
  const [currentMin, setCurrentMin] = useState<null|string>(null);

  const { isOn } = useAppSelector((state) => state.basicStates);
  const { isModalActive } = useAppSelector((state) => state.modal);
  const { isRunning, unixtimeWhenRing, breaks } = useAppSelector(
    (state) => state.clock.timer
  );

  const { alarms } = useAppSelector((state) => state.clock.alarm);

  const dispatch = useAppDispatch();

  const hour = getPolishTime(time).hours;
  const min = getPolishTime(time).minutes;
  const dayName = getPolishTime(time).dayName;

  const breaksTime = breaks.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const activeAlarms = alarms.filter((alarm) => alarm.active);

  const numbersToEdit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (activeAlarms && isOn && !isModalActive) {
    activeAlarms.map((alarm) => {
      const alarmHour = numbersToEdit.includes(alarm.hour)
        ? `0${alarm.hour}`
        : alarm.hour.toString();
      const alarmMinute = numbersToEdit.includes(alarm.minute)
        ? `0${alarm.minute}`
        : alarm.minute.toString();
      const alarmId = alarm.unixtimeId;

      if (alarm.days.length === 0 && !usedAlarmIds.includes(alarmId)) {
        if (alarmHour === hour && alarmMinute === min) {
          console.log("1111111111111");
          setUsedAlarmIds([...usedAlarmIds,alarmId])

        }
      }

      if (alarm.days.includes(dayName) && !usedAlarmIds.includes(alarmId)) {
        if (alarmHour === hour && alarmMinute === min) {
          console.log("222222222222222");
          setUsedAlarmIds([...usedAlarmIds,alarmId])
        }
      }
    });
  }

  useEffect(() => {
    if (getUnixTime() > unixtimeWhenRing + breaksTime && isRunning) {
      dispatch(setCurrentModal(enumCurrentModal.modalAlarmRinging));
      dispatch(modalTurnOn());
      dispatch(timerReset());
    }
    const updateTime = () => {
      setTime(getUnixTime);
    };
    const clock = setTimeout(updateTime, 1000);
    return () => clearTimeout(clock);
  }, [time, unixtimeWhenRing, isRunning]);

  useEffect(() => {
    console.log("test" ,usedAlarmIds, currentMin)
    if (min !== currentMin) {
      setUsedAlarmIds([]);
      setCurrentMin(min);
    }
  }, [time]);

  return (
    <StyledClock>
      {props.size === "small" ? (
        <StyledClockSmall>
          {hour}:{min}
        </StyledClockSmall>
      ) : (
        <StyledClockLarge>
          {hour}:{min}
        </StyledClockLarge>
      )}
    </StyledClock>
  );
}

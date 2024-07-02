import { useAppSelector } from "../redux/hooks";

const useDate = () => {
  const getUnixTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
  };

  const getPolishTime = (
    unixTime: number
  ): {
    minutes: string;
    hours: string;
    weekday: string;
    weekdayNumber: number;
    month: string;
    monthNumber: number;
    year: number;
  } => {
    const date = new Date(unixTime);
    const locale = "pl-PL";
    const weekday = date.toLocaleDateString(locale, { weekday: "long" });
    const weekdayNumber = date.getDay() + 1;
    const month = date.toLocaleDateString(locale, { month: "long" });
    const monthNumber = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      minutes: hours.split(":")[1],
      hours: hours.split(":")[0],
      weekday,
      weekdayNumber,
      month,
      monthNumber,
      year,
    };
  };

  return { getUnixTime, getPolishTime };
};

export default useDate;

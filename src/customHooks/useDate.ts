import { useAppSelector } from "../redux/hooks";

const useDate = () => {
  const getUnixTime = () => {
    const currentDate = new Date();
    return currentDate.getTime();
  };

  const getIsToday = (unixtime: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000 - 1;

    return unixtime >= todayStart && unixtime <= todayEnd;
  };

  const getPolishTime = (
    unixTime: number
  ): {
    minutes: string;
    hours: string;
    dayName: string;
    dayInArr: number;
    dayOfMonth: number;
    monthName: string;
    monthInArr: number;
    monthOfYear: number;
    year: number;
  } => {
    const date = new Date(unixTime);
    const locale = "pl-PL";

    const hours = date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dayName = date.toLocaleDateString(locale, { weekday: "long" });
    const dayInArr = date.getDay();
    const dayOfMonth = date.getDate()
    const monthName = date.toLocaleDateString(locale, { month: "long" });
    const monthInArr = date.getMonth();
    const monthOfYear = monthInArr + 1;
    const year = date.getFullYear();

    return {
      minutes: hours.split(":")[1],
      hours: hours.split(":")[0],
      dayName,
      dayInArr,
      dayOfMonth,
      monthName,
      monthInArr,
      monthOfYear,
      year,
    };
  };

  return { getUnixTime, getIsToday, getPolishTime };
};

export default useDate;

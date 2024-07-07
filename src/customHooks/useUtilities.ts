import { useAppSelector } from "../redux/hooks";
import { useMemo } from "react";

const useUtilities = () => {

  function generateRandomGradient(): string {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const getRandomAngle = () => {
      return Math.floor(Math.random() * 361);
    };

    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = getRandomAngle();
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  }
// ===============================================================================================================================
// ===============================================================================================================================
  interface CallHistory {
    unixTime: number;
    elementId: number;
    whoCall: string;
    whoCallUid: string;
    toWho: string;
    toWhoUid: string | null;
  }
  
  interface DayEntryCalls {
    day: number;
    month: string;
    year: number;
    weekDay: string;
    calls: CallHistory[];
    startOfDayUnixTime:number
  }
  
  const monthNames = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  
  const weekDayNames = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  
  function mapCallsByDay(arrHistory: CallHistory[]): DayEntryCalls[] {
    const result: DayEntryCalls[] = [];
  
    arrHistory.forEach((call) => {
      const date = new Date(call.unixTime);
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const weekDay = weekDayNames[date.getDay()];
  
      // Calculate the start of the day in Unix time
      const startOfDayDate = new Date(year, date.getMonth(), day);
      const startOfDayUnixTime = startOfDayDate.getTime();
  
      // day obj
      let dayEntry = result.find(
        (entry) =>
          entry.day === day && entry.month === month && entry.year === year
      );
      if (!dayEntry) {
        dayEntry = {
          day: day,
          month: month,
          year: year,
          weekDay: weekDay,
          startOfDayUnixTime: startOfDayUnixTime,
          calls: [],
        };
        result.push(dayEntry);
      }
  
      // add to day
      dayEntry.calls.push({
        unixTime: call.unixTime,
        elementId: call.elementId,
        whoCall: call.whoCall,
        whoCallUid: call.whoCallUid,
        toWho: call.toWho,
        toWhoUid: call.toWhoUid,
      });
    });
  
    return result;
  }

// ===============================================================================================================================
// ===============================================================================================================================

interface DataObject {
  unixtime: number;
  [key: string]: any;  
}

function mapMessagesByDay(objects: DataObject[]): DataObject[][] {
  const groups: { [key: string]: DataObject[] } = {};

  const now = new Date();
  const polandOffset = now.getTimezoneOffset() + 60; 
  const polandTime = new Date(now.getTime() + polandOffset * 60 * 1000);
  const jan = new Date(polandTime.getFullYear(), 0, 1).getTimezoneOffset();
  const jul = new Date(polandTime.getFullYear(), 6, 1).getTimezoneOffset();
  const isDST = Math.max(jan, jul) !== polandTime.getTimezoneOffset();
  
  objects.forEach(obj => {
    const date = new Date(obj.unixtime + (isDST?7200000:3600000)).toISOString().split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(obj);
  });

  return Object.values(groups);
}

// ===============================================================================================================================
// ===============================================================================================================================

  return { generateRandomGradient,mapCallsByDay,mapMessagesByDay };
};

export default useUtilities;

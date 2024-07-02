import { useAppSelector } from "../redux/hooks";

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
  
  interface DayEntry {
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
  
  function mapCallsByDay(arrHistory: CallHistory[]): DayEntry[] {
    const result: DayEntry[] = [];
  
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

  return { generateRandomGradient,mapCallsByDay };
};

export default useUtilities;

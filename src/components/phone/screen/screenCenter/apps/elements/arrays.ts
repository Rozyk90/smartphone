const arrContacts = [
  { name: "Łukasz Różycki", number: "884923943" },
  { name: "Anna Kowalskdasa", number: "654321391" },
  { name: "Jan Nowak", number: "112233987" },
  { name: "Katarzyna Wiśewska", number: "223344876" },
  { name: "Michał Zieliński", number: "334455765" },
  { name: "Agnieszka Szymańska", number: "445566654" },
  { name: "Tomasz Woźniak", number: "556677543" },
  { name: "Magdalena Wójcik", number: "667788432" },
  { name: "Piotr Krawczyk", number: "778899321" },
  { name: "Aleksandra Kaczmarek", number: "889900210" },
];

const arrHistory = [
  {
    unixTime: 1732135200,
    callerNumber: "884923943",
    calledTo: "999999999",
  },
  {
    unixTime: 1729543200,
    callerNumber: "667788889",
    calledTo: "884923943",
  },
  {
    unixTime: 1726951200,
    callerNumber: "884923943",
    calledTo: "556677778",
  },
  {
    unixTime: 1724359200,
    callerNumber: "445566667",
    calledTo: "884923943",
  },
  {
    unixTime: 1721767200,
    callerNumber: "884923943",
    calledTo: "223344556",
  },
  {
    unixTime: 1719175200,
    callerNumber: "990011223",
    calledTo: "884923943",
  },
  {
    unixTime: 1716583200,
    callerNumber: "884923943",
    calledTo: "889900112",
  },
  {
    unixTime: 1713991200,
    callerNumber: "778899001",
    calledTo: "884923943",
  },
  {
    unixTime: 1711399200,
    callerNumber: "884923943",
    calledTo: "667788990",
  },
  {
    unixTime: 1708807200,
    callerNumber: "556677889",
    calledTo: "884923943",
  },
  {
    unixTime: 1706218800,
    callerNumber: "884923943",
    calledTo: "445566778",
  },
  {
    unixTime: 1703626800,
    callerNumber: "334455667",
    calledTo: "884923943",
  },
  {
    unixTime: 1701034800,
    callerNumber: "123456789",
    calledTo: "884923943",
  },
  {
    unixTime: 1698446400,
    callerNumber: "884923943",
    calledTo: "112233987",
  },
  {
    unixTime: 1718960000,
    callerNumber: "556677543",
    calledTo: "884923943",
  },
  {
    unixTime: 1690673460,
    callerNumber: "667788432",
    calledTo: "884923943",
  },
  {
    unixTime: 1718930000,
    callerNumber: "777888999",
    calledTo: "884923943",
  },
  {
    unixTime: 1718900000,
    callerNumber: "884923943",
    calledTo: "445566654",
  },
  {
    unixTime: 1718890000,
    callerNumber: "884923943",
    calledTo: "889900210",
  },
  {
    unixTime: 1672533060,
    callerNumber: "445566654",
    calledTo: "884923943",
  },
  {
    unixTime: 1688080320,
    callerNumber: "588877543",
    calledTo: "884923943",
  },
  {
    unixTime: 1693264320,
    callerNumber: "884923943",
    calledTo: "223344876",
  },
  {
    unixTime: 1718840000,
    callerNumber: "334455765",
    calledTo: "884923943",
  },
  {
    unixTime: 1718810000,
    callerNumber: "884923943",
    calledTo: "654321391",
  },
  {
    unixTime: 1718800000,
    callerNumber: "112233987",
    calledTo: "884923943",
  },
  {
    unixTime: 1718792127,
    callerNumber: "884923943",
    calledTo: "111111111",
  },
];

// ==================================================================
// ==================================================================

function unixToPolishTime(unixTime: number): string {
  // Tworzymy obiekt Date na podstawie czasu Unix
  const date = new Date(unixTime * 1000);

  // Opcje formatowania czasu
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  };

  // Formatujemy czas zgodnie z polską strefą czasową
  const formattedTime = new Intl.DateTimeFormat("pl-PL", options).format(date);
  return formattedTime;
}

// ==================================================================
// ==================================================================

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomAngle(): number {
  return Math.floor(Math.random() * 361);
}

function generateRandomGradient(): string {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = getRandomAngle();
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

// ==================================================================
// ==================================================================

const formatPhoneNumber = (number: string) => {
  if (number.length <= 3) {
    return number;
  } else if (number.length <= 6) {
    return number.replace(/(\d{3})(\d+)/, "$1 $2");
  } else if (number.length <= 9) {
    return number.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
  } else {
    return number;
  }
};

function findContactName(number: string) {
  const contact = arrContacts.find((contact) => contact.number === number);
  return contact
    ? { isContact: true, name: contact.name }
    : { isContact: false, name: formatPhoneNumber(number) };
}

interface CallHistory {
  unixTime: number;
  callerNumber: string;
  calledTo: string;
}

interface DayEntry {
  day: number;
  month: string;
  year: number;
  weekDay: string;
  calls: CallHistory[];
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
    const date = new Date(call.unixTime * 1000);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const weekDay = weekDayNames[date.getDay()];

    // Znajdź lub stwórz nowy obiekt dla danego dnia
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
        calls: [],
      };
      result.push(dayEntry);
    }

    // Dodaj połączenie do odpowiedniego dnia
    dayEntry.calls.push({
      unixTime: call.unixTime,
      callerNumber: call.callerNumber,
      calledTo: call.calledTo,
    });
  });

  return result;
}

export {
  mapCallsByDay,
  arrContacts,
  arrHistory,
  unixToPolishTime,
  generateRandomGradient,
  findContactName,
  formatPhoneNumber,
};

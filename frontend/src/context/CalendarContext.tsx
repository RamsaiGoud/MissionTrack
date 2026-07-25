import { createContext, useContext, useState } from "react";

interface CalendarContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function CalendarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date())
  );

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      "useCalendar must be used inside CalendarProvider"
    );
  }

  return context;
}
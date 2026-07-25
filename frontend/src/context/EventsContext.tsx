import { createContext, useContext, useState } from "react";
import { initialEvents } from "../data/events";
import type { Event } from "../types/Event";

interface EventsContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventsContext = createContext<EventsContextType | undefined>(
  undefined
);

export function EventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState(initialEvents);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useEvents must be used inside EventsProvider"
    );
  }

  return context;
}
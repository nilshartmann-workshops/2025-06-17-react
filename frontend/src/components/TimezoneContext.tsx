import { createContext, type ReactNode, useContext, useState } from "react";

type TimezoneContext = {
  timezone: string;
  setTimezone(newTimezone: string): void;
};

const TimezoneContext = createContext<TimezoneContext>({
  timezone: "Europe/Berlin",
  setTimezone() {},
});

type TimezoneProviderProps = {
  children: ReactNode;
};
export default function TimezoneContextProvider({
  children,
}: TimezoneProviderProps) {
  const [timezone, setTimezone] = useState("Europe/Berlin");

  return (
    <TimezoneContext value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext>
  );
}

export function useTimezoneContext() {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error(
      "Invalid Timezone Context Usage. Did you forgot to add TimezoneProvider?",
    );
  }

  return context;
}

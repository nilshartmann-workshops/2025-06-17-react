# Verwenden einer nicht-React-Hook-Form-kompatiblen Komponente 2

# Files

- src/components/ReservationEditor.tsx

# Aufgabe

* Erweitere das Formular mit `DateTimePicker`-Komponenten, um den Reservierungszeitraum auszuwählen

# Schritte

1. Erweitere dein zod-Schema für den Reservierungszeitraum
    - Das Feld soll `timeRange` heißen um vom Typ `TimeRange` sein.
    - Den `TimeRange`-Typen haben wir bereits in `src/types.ts` beschrieben
    - Kannst du mit `refine()` den Typen so verfeinern, dass er sicherstellt, dass das `end`-Feld nach dem
      `start`-Feld liegt? Reservierungen, die beginnen, bevor sie zu ende sind, macht keinen Sinn.
        - Zum vergleichen von zwei Datum-Werten kannst du z.B. `dayjs` verwenden (im Workspace installiert)
2. Verwende jeweils eine `DateTimePicker`-Komponente, um das `start`- und `end`-Datum auswählbar zu machen
    - Achtung! Du musst wieder jeweils die `Controller`-Komponente verwenden
    - Die Fehlermeldung kannst du mit `slotProps` -> `textField` übergeben
    - Der `DateTimePicker` erwartet ein `dayjs`-Objekt als `value` bzw. liefert ein `dayjs`-Objekt in `onChange` zurück
        - In userem `TimeRange`-Typen ist der Wert aber als `string` abgelegt.
        - Du musst den Wert also vor der Übergabe an `DateTimePicker` in ein `dayjs`-Objekt konvertieren und in
          `onChange` das `dayjs`-Objekt wieder zurück in einen ISO-String konvertieren (`.toISOString()`-Methode)

# Material

- zod `refine` um eigene Validierungen zu beschreiben: https://zod.dev/api?id=refinements
- dayjs
    - `isAfter`: https://day.js.org/docs/en/query/is-after
    - `isBefore`: https://day.js.org/docs/en/query/is-before
    - Zeit als ISO8601-String ausgeben: https://day.js.org/docs/en/display/as-iso-string
- MUIx `DateTimePicker`: https://mui.com/x/react-date-pickers/date-time-picker/
    - LocalizationProvider: https://mui.com/x/api/date-pickers/localization-provider/
        - In `src/main.tsx` ist als `dateAdapter` der
          `AdapterDayjs` eingestellt (https://mui.com/x/react-date-pickers/timezone/)
    - Fehler anzeigen im `DateTimePicker` mit
      `slotProps`: https://mui.com/x/react-date-pickers/validation/#show-the-error


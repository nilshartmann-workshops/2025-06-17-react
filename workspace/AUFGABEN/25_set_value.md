# Ändern von Werten im Formular per API 

# Files

- src/components/ReservationEditor.tsx

# Aufgabe

- Mit jeweils einem Button soll man das Start- bzw. Ende-Datum einer Reservierung auf "heute" bzw. "morgen" setzen können

# Schritte

1. Füge zwei Buttons zum Formular hinzu
    - Einer der beiden Button soll das Start-Datum auf "heute" setzen
    - Der andere Button soll das Ende-Datum auf "Morgen" setzen (oder irgendein anderes Datum, das nach "heute" liegt)
    - Zum Arbeiten mit dem Datum kannst du `dayjs` verwenden
    - Den Wert, den du jeweils setzen musst, muss vom Type `string` sein und dem ISO8601-Format entsprechen

# Material

- React Hook Form `setValue`: https://react-hook-form.com/docs/useform/setvalue
- Dayjs
  - `startOf`: `https://day.js.org/docs/en/manipulate/start-of`
  - `add`: https://day.js.org/docs/en/manipulate/add


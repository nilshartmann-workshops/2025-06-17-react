# Formulare mit React Hook Form

# Files

- src/routes/create/CreateReservationRoute.tsx
- src/components/ReservationEditor.tsx (anlegen)
- src/components/AppLayout.tsx

# Aufgabe

* Baue den ersten Schritt für ein Formular zum Anlegen neuer Reservierungen

# Vorbereitung

- Die Route `/create` für das Formular ist bereits konfiguriert
- Du kannst den Link darauf in der `AppLayout`-Komponente aktivieren, in dem du dort `showCreateLink` auf `true` setzt
- Für die eigentliche Editor-Komponente dann bitte die Datei `src/components/RegistrationEditor.tsx` verwenden

# Schritte

- Du kannst den kompletten Code in der Datei `src/components/RegistrationEditor.tsx` schreiben!

1. Beschreibe mit Zod das Objekt für den State unseres Formulars.
    - `ReservationFormState` soll folgende Eigenschaften haben:
        - `customerName`: ein String, der nicht leer sein darf
        -
      `expectedGuests`: eine Zahl die mindestens
      `5` sein muss (wir verleihen unsere Trucks erst ab einer Gruppengröße von mindestens fünf Personen)
        - `specialRequests`: ein optionaler String, der null oder undefined sein soll
2. Verwende `useForm` mit dem `zodResolver` für die Formularverwaltung mit dem `ReservationFormState`
3. Lege das Formular an
    - Die Root-Komponente muss das `form`-Element sein
    - Darin soll es drei `TextField`-Komponenten für `customerName`, `expectedGuests` und `specialRequests` geben
    - `expectedGuests` soll vom `type` `number` sein
        - Für ein besseres Layout und auch die Darstellung der Fehlermeldungen später, kannst du jedes
          `TextField` in einem `FormControl` von MUI wrappen.
    - Verwende die `form.register`-Funktion, um die drei Textfelder in React Hook Form zu registrieren
    - Lege eine `handleSave` und `handleError`-Funktion in deiner Komponente an, und verwende diese als
      `onSubmit`-Handler in deinem `form`-Element (mit `handleSubmit` von React Hook Form)
        - Das "richtige" Speichern machen wir später. Im ersten Schritt reicht es, wenn du in `handleSave` und
          `handleError` jeweils nur die Formulardaten bzw. die Fehler mit `console.log` auf die Konsole schreibst

# Material

- `useForm`: https://react-hook-form.com/docs/useform
    - resolver: https://react-hook-form.com/docs/useform#resolver
        - `zodResolver`: https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod
    - `register`: https://react-hook-form.com/docs/useform/register
      - siehe dort auch `valueAsNumber` für das Number-Field `expectedGuests`
    - `handleSubmit`: https://react-hook-form.com/docs/useform/handlesubmit
- MUI
    - TextField: https://mui.com/material-ui/react-text-field/
    - FormControl: https://mui.com/material-ui/api/form-control/
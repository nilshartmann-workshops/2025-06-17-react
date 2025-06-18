# Behandlung ungültiger Werte

# Files

- src/components/ReservationEditor.tsx

# Aufgabe

* Gib visuelles Feedback aus, wenn die Felder im Formular nicht korrekt befüllt sind

# Schritte

1. Die Text-Felder sollen Fehlermeldungen darstellen
    - die Fehlermeldungen stehen in einem Objekt in `form.formState`
    - du kannst sie mit den Properties `error` bzw. `helperText` der `TextField`-Komponente darstellen
    - die Fehlermeldungen sollten spätestens angezeigt werden, wenn auf den "Request Reservation"-Button gedrückt wird
    - Kannst du für das `customerName` oder `expectedGuests` einen Info-/Hilfe-Text hinzufügen, die nur angezeigt wird, wenn das Feld _keinen_ Fehler hat? 
2. Füge bei mindestensm einem Feld eine eigene Fehlermeldung hinzu
    - Ergänze dazu das zod-Objekt um eine oder mehrere Fehlermeldungen
3. Kannst du einen "Clear" oder "Reset"-Button bauen, der das Formular - samt Fehlermeldungen - wieder leer macht?

# Material

- React Hook Form `formState`: https://react-hook-form.com/docs/useform/formstate
- MUI "Validation" (Darstellung der Fehler als "Helpertext"): https://mui.com/material-ui/react-text-field/#validation
- Zod Custom Error Messages: https://zod.dev/error-customization
- 
# Reagieren auf Änderungen im Formular

# Files

- src/components/ReservationEditor.tsx

# Schritte

* Zeige den ungefähren Preis für eine Reservierung an

1. Die Funktion zum Berechnen des ungefähren Preises ist schon fertig (`calculatePrice` in `src/data.ts`).
    - Verwende diese Funktion um den berechneten Preis im Formular anzuzeigen
    - Die Funktion benötigt den aktuallen `timeRange`- und `expectedGuests`-Wert
    - Die Darstellung des Preises soll unmittelbar aktualisiert werden, sobald sich einer der Werte (Zeitraum, Anzahl Gäste) ändert

# Material

- React Hook Form `watch`: https://react-hook-form.com/docs/useform/watch


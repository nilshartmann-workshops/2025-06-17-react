# Query Options definieren

# Dateien

* src/routes/reservationlist/ReservationListRoute.tsx
* src/queries.ts (anlegen)

# Aufgabe

* Führe ein Refaktoring durch und lege eine zentrale Factory-Funktion für die Query-Optionen an
* Erzeuge dir eine wiederverwendbare `ky`-Instanz, die als `prefixUrl` unser Backend kennt

# Schritte

1. Lege die Datei `src/queries.ts` an
2. Erzeuge eine eigene Instanz von `ky` mit `extend`
    - Setze die `prefixUrl`
    - Schalte Retries aus
3. Lege eine Factory-Funktion an, die die `queryOptions` für den Reservierung-List-Query zurückliefert
    - Die Logik kannst du aus dem Query in `ReservationListRoute` darin verschieben
4. Verwende in `ReservationListRoute` deine Factory-Funktion

# Material

- Query Options: https://tanstack.com/query/latest/docs/framework/react/guides/query-options
    - `queryOptions` API: https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions
    - Artikel "The Query Options API": https://tkdodo.eu/blog/the-query-options-api
      - Gute Übersicht, aber die Idee im letzten Abschnitt "Query Factories" finde ich zu kompliziert
- ky `extends`: https://github.com/sindresorhus/ky?tab=readme-ov-file#kyextenddefaultoptions
    - `prefixUrl`: https://github.com/sindresorhus/ky#prefixurl
    - `retry`: https://github.com/sindresorhus/ky#retry
        - Achtung! Das Wiederholen von Queries im Fehlerfall (retry) solltest du in ky
          _ausschalten_ und stattdessen über TanStack Query konfigurieren (machen wir später)
    
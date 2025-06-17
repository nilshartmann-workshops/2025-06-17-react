# Daten laden mit Suspense Query

# Dateien

* src/routes/reservationlist/ReservationListRoute.tsx

# **Vorbereitung**: Prozesse starten

### Schritt 1: Starten des Backends

1. Gehe in das Verzeichnis REPOSITORY_ROOT/backend
2. Führe `pnpm install` oder `npm install` aus
3. Führe `pnpm start` oder `npm start` aus
4. 👉 Das Backend sollte nun auf Port 7200 gestartet sein.
   - Zum Testen kannst du  http://localhost:7200/api/reservations im Browser oder per curl, wget etc. aufrufen
   - Zurückgeliefert wird eine Liste von JSON-Objekten

### Schritt 2: Starten des Frontends

1. Öffne das Verzeichnis REPOSITORY_ROOT/workspace in deiner IDE
2. Führe in dem Verzeichnis `pnpm install` oder `npm install` aus
3. Führe in dem Verzeichnis `pnpm dev` oder `npm dev` aus
4. 👉 Das Frontend läuft jetzt auf Port 3000. 
  - Du kannst es im Browser über http://localhost:3000 erreichen

# Aufgabe: Lade die Reservierungen aus dem Backend und zeige die Tabelle mit den Daten an

## Schritte

1. Schreibe einen `useSuspenseQuery`, der die Daten lädt (Endpunkt: http://localhost:7200/api/reservations)
    - Setze einen `queryKey`
    - Implementiere die `queryFn`
      - Die Daten kannst du mit `ky` oder mit `fetch` laden
      - Der Endpunkt liefert eine Liste von `Reservation`-Objekten zurück. Den TypeScript-Typen dafür findest du in `src/types.ts`
2. Übergib die geladenen Daten an die fertige `ReservationTable`-Komponente (`src/components/ReservationTable.tsx`)
3. ⚠️ Der Weg, wie wir hier Daten laden und mit den Daten umgehen ist stark vereinfacht
    - was fehlt aus deiner Sicht?
    - was könnten wir noch optimieren?

# Material

- ky library for data fetching: https://github.com/sindresorhus/ky
- Queries with TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/queries
- Query Function: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
- Query Key: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
- useSuspenseQuery: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery

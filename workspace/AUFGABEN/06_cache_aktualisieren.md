# TanStack Query Cache aktualisieren

# Files

- src/main.tsx
- src/queries.ts
- src/components/ReservationDetailDialog.tsx
- src/routes/reservationlist/ReservationListRoute.tsx

# Aufgabe

* Aktualisiere die Reservation-Liste, wenn eine Reservierung bearbeitet wurde

# Schritte

1. Um den Inhalt des Caches zu sehen, kannst du die Developer Tools aktivieren
    - Dazu fügst du beim `render` in `main.tsx` unterhalb der `QueryClientProvider`-Komponente als Kind ein:
      - `<ReactQueryDevtools />`
    - Die Developer Tools werden als kleine "Insel" in der Anwendung angezeigt. Du kannst darauf klicken, um den Cache zu untersuchen.
    - Die Developer Tools werden in einem Produktionsbuild übrigens automatisch entfernt.

2. Vervollständige den `ReservationDetailDialog`
    - Dieser modale Dialog wird angezeigt wenn, du in einer Tabellenzeile auf die Spalte "Food Truck" klickst
    - Leider zeigt er noch keine Daten an...
    - Du kannst in der Komponente die Daten für die Reservierung laden (alle Teile dafür hast du ja schon gebaut...) und mit der `ReservationDetailCard` anzeigen (siehe `TODO` in der Komponente)
    - Wenn du den Dialog jetzt öffnest, sollte die angeklickte Reservierung angezeigt werden
      - Die Button zum Setzen des Status funktionieren auch.
      - Aber: was passiert (nicht) in der Tabelle nach dem Ändern des Status? 🙀

3. Aktualisiere den Cache, so dass die Tabelle aktuell bleibt
    - Wenn der Status im Dialog verändert wird, soll natürlich auch die Tabelle aktualisiert werden
    - Du hast mehrere Möglichkeiten, das zu realisieren, z.B.
      - die Tabelle kann regelmäßig nach neuen Daten pollen
      - du kannst `invalidateQueries` oder `refetchQueries` verwenden
      - du kannt einen Button bauen, mit dem ein Anwender die Tabelle selbst aktualisieren kann
      - du kannst unterschiedliche Möglichkeiten kombinieren
    - Überleg' dir, welche Strategie dir am besten gefällt und setze sie um


# Material

- TanStack Query Devtools: https://tanstack.com/query/latest/docs/framework/react/devtools
- Queries invalidieren: https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
- QueryClient.https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
- In der useClient-Doku findest du Informationen zum refetching: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
  - Die Optionen kannst du auch bei useSuspenseQuery verwenden und auch global in den Query Client-Einstellungen (`create-query-client.tsx`)


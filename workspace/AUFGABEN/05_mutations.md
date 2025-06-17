# Daten schreiben mit Mutations

# Files

- src/queries.ts
- src/components/ReservationDetailCard.tsx

# Aufgabe

* Implementiere die Mutation zum Setzen des Status einer Reservierung

# Schritte

1. Beschreibe die Mutation in `queries.ts`
    - Eine Funktion `mutationOptions` (vergleichbar mit `queryOptions`) gibt es noch nicht in TanStack Query
    - Implementiere deshalb stattdessen einen Custom Hook, der die Mutation ausführt
    - Die Mutation soll für ein angegebene Reservierung den Endpunkt `reservations/${reservationId}/status` mit einem HTTP `PUT` Request aufrufen. 
      - Der Payload ist ein Json-Objekt, das aus dem Feld `status` besteht.
      - Die erlaubten Werte für Status sind im TypeScript-Typ `ReservationStatus` festgelegt
2. Verwende die Mutation in der Komponente `ReservationDetailCard`
    - Hier gibt es bereits Buttons, die aber noch nichts tun, wenn man drauf drückt 😢
    - Wenn man darauf drück, soll der Status entsprechend verändert werden
    - Denk dran, dass du den Cache aktualsieren musst!
    - Wenn der Status aktualisiert wurde, und du wieder auf die Übersichtsseite gehst (klicken auf "Rent a Food Truck" im App Header), welche Netzwerk Requests werden ausgeführt?
      - Woran liegt das?
      - In `create-query-client` kannst du das Property `refetchOnMount` auf `false` setzen. Was passiert dann?
3. Während die Mutation ausgeführt wird, sollen beide Buttons disabled sein
    - Zum Testen kannst du die Mutation mit dem Search Parameter `?slow=2000` künstlich verlangsamen


# Material

- Mutations mit TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
- Cache nach Mutations aktualisieren mit `setQueryData`: https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses#immutability
- useMutation API: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation


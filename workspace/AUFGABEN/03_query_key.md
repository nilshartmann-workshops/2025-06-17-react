# Übung: Arbeiten mit dem Query Key

# Aufgabe 1: Mach die Reservation-Liste sortierbar

### Dateien

* src/routes/reservationlist/ReservationListRoute.tsx
* src/queries.ts

### Schritte

* Der Endpunkt `/api/reservations` kann einen Suchparameter
  `orderBy` entgegennehmen, mit dem du eine sortierte Liste vom Backend bekommst:
    * `?orderBy=start` sortiert nach der Startzeit einer Reservierung
    * `?orderBy=foodTruck` sortiert nach dem Namen der Food Trucks
    * `?orderBy=status` sortiert nach dem Status der Reservierung (`pending`, `approved`, `rejected`)
    * `?orderBy=customerName` sortiert nach dem Kunden
    * Die erlaubten Bezeichnungen sind im TypeScript-Type `OrderBy` (`types.ts`) definiert

1. Erweitere die `queryOptions` für den Query um einen `orderBy`-Parameter und übergib das `orderBy` an den API-Aufruf
2. Erweitere die `ReservationsLoader`-Komponente, so dass man dort die Sortierreihenfolge einstellen kann

* Du kannst dazu die fertige Komponente `OrderButtonBar` nehmen (`src/components/OrderButtonBar.tsx`)
    * Diese Komponente setzt im Frontend den Suchparameter `orderBy`, den du in der
      `ReservationsLoader`-Komponente auslesen kannst
* Du kannst auch einen anderen Mechanismus bauen (z.B. Knöpfe und lokalen State, eine eigene ButtonBar, ...)
* Verwende die eingestellte Sortierung, um die Daten sortiert vom Backend zu lesen und in der Tabelle anzuzeigen

# Aufgabe 2: Detailansicht einer Reservierung

### Dateien

* src/routes/reservation/ReservationRoute.tsx
* src/queries.ts

### Schritte

* Wenn man in der Tabelle auf **Edit** klickt, geht eine Seite auf, aber die ist noch leer
* Implementiere den entsprechenden Query und zeige die geladenen Daten auf einer eigenen Seite an.


1. Implementiere einen Query, der die Detail-Daten einer Reservierung lädt
    * Der API-Endpunkt dazu ist `/api/reservations/{reservationId}`, also z.B. `/api/reservations/1`
    * Der TypeScript-Typ ist `Reservation` (s. `types.ts`)
    * Lege einen neue `queryOptions`-Factory-Funktion dafür an
2. Zur Darstellung der Reservierung arbeiten wir in der Datei `src/routes/reservation/ReservationRoute.tsx`
3. Lege darin eine neue Komponente `src/routes/reservation/ReservationRoute.tsx` an, z.B. `ReservationDetailLoader`
4. In der Komponente musst du zunächst die Id der Reservierung aus der URL im Browser lesen
    * Das kannst du im React Router wie folgt tun:
    * ```typescript
      const { reservationId } = useParams();
    
      if (!reservationId) {
        throw new Error("Invalid reservationId");
      }
      
      // reservationId  ist jetzt die Id aus der URL im Browser
      ```
    * Du kannst dir überlegen, ob du die Id direkt in `ReservationDetailLoader` abfragst oder die bestehende
      `ReservationRoute`-Komponente erweiterst, darin die Id abfragst und die Id dann als Property an deine neue
      `ReservationDetailLoader`-Komponente übergibst
5. Mit der Id kannst du jetzt mit einem Suspense-Query die Reservierung laden.
    * Dazu verwendest du deine neue Factory-Funktion
6. Die geladenen Daten kannst du mit der fertigen Komponente `ReservationDetailCard` (`src/components`) anzeigen

# Material

# React Router
* `useSearchParams`, um Search-Parameter aus der URL im Browser: zu lesen und zu setzen https://reactrouter.com/6.30.1/hooks/use-search-params
* `useParams` um Parameter aus der URL im Browser zu lesen: https://reactrouter.com/6.30.1/hooks/use-params
* (Die Router-Konfiguration unserer Anwendung findest du in der Datei `main.tsx`)
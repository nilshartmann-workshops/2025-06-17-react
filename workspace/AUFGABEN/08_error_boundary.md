# Fehlerbehandlung mit Error Boundaries

# Files

- src/routes/reservation/ReservationRoute.tsx

# Aufgabe

* Zeige eine Fehlermeldung an, wenn die Reservation-Details nicht geladen werden konnten

# Fehler provozieren

Um zu testen, ob die Fehlerbehandlung funktioniert, muss ein Query natürlich auch fehlerhaft sein. Am einfachsten ist es, wenn du einfach den Backend-Prozess beendest.

# Schritte

1. Implementiere eine Error-Boundary-Komponente, die eine Fehlermeldung anzeigt
2. Wenn es beim Laden der Reservierungsdetails (
   `ReservationDetailRoute`) einen Fehler gibt, soll die Error-Boundary-Komponente angezeigt werden
3. Du kannst die Error-Boundary-Komponente, so dass es z.B. mit einem Button eine "Retry"-Möglichkeit gibt ("Noch einmal versuchen")
    - Jetzt kannst du - wenn die Error-Boundary-Komponente dargestellt ist - den Backend-Prozess wieder starten
    - Wenn dein Retry-Mechanismus funktioniert, müsste der Query jetzt funktionieren und die Error-Boundary verschwinden und stattdessen die Reservierung angezeigt werden

# Material

* React: Fehler abfangen mit Error Boundaries: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
    - (Hinweis: Du musst keine eigene Error-Boundary-Klasse implementieren, wir nutzen die Bibliothek react-error-boundary.)

- React Error Boundary Bibliothek: https://github.com/bvaughn/react-error-boundary
    - Fallback-Komponenten-Prop: https://github.com/bvaughn/react-error-boundary?tab=readme-ov-file#errorboundary-with-fallbackcomponent-prop

* TanStack Query
    - Reset error boundary: https://tanstack.com/query/latest/docs/framework/react/guides/suspense#resetting-error-boundaries
    - useQueryErrorResetBoundary: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryErrorResetBoundary#usequeryerrorresetboundary
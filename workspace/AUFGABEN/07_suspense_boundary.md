# Suspense Boundaries und Background Fetching

# Files

- src/queries.ts
- src/routes/reservation/ReservationRoute.tsx
- src/routes/reservationlist/ReservationListRoute.tsx

# Aufgabe

* Baue Feedback ein, um anzuzeigen, dass Daten geladen werden

# Verzögern der Queries

Um zu testen, ob die Suspense Boundaries und andere Loading Indicatoren richtig funktionieren, müssen die Queries natürlich entsprechend langsam sein.
Dazu gibt es zwei Möglichkeiten:
1. Du kannst in `queries.ts` jeden Query künstlich langsam machen, indem du den Search Parameter `?slow=2000` anhängst (statt der `2000` kannst du jede andere Zahl eintragen. Die Zahl gibt eine Zeit in Millisekunden an, die der Query verzögert wird). Achtung! Beim Listen-Query haben wir schon einen Search-Parameter, d.h. du musst `&slow=2000` ranhängen.
2. In den TanStack Query Devtools kannst du einen Cache-Eintrag anklicken und in den Details in der rechten Spalte dann "Trigger Loading" anklicken. Dann bleibt der Query solange im Loading-Zustand bis du auf "Restore Loading" klickst

# Schritte

1. Baue Suspense Boundaries ein, damit der Benutzer ein Feedback bekommt, während die Liste bzw. die Detail-Ansicht dargestellt wird
    - Das kannst du z.B. in den jeweiligen `Route`-Komponenten machen
    - Es gibt eine fertige `ReservationDetailPlaceholder`-Komponente und eine `ReservationTablePlaceholder`-Komponente, die du als Fallback verwenden kannst. Aber du kannst dir natürlich eigene Komponenten dafür bauen. 
2. Wenn die Daten für die Tabelle im Hintergrund aktualisiert werden, gib ein visuelles Feedback aus

# Material

- React Suspense Komponente: https://react.dev/reference/react/Suspense
- Fetching Indicators: https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators
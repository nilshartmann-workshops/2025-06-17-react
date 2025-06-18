# Speichern und Feedback

# Files

- src/components/ReservationEditor.tsx
- src/queries.ts

# Aufgabe

* Wenn das Formular vollständig ausgefüllt ist, sollen die Daten auf dem Server gespeichert werden
* Es soll ein Feedback angzeigt werden, wenn das Speichern (nicht) erfolgreich war

# Schritte

1. Vervollständige die Schema-Beschreibung unseres Formulars (`ReservationFormState`)
    - Als `specialRequests` haben wir dort einen optionalen String, das Backend erwartet aber entweder `null` / `undefined` oder einen String mit Text. Leerstrings akzeptiert das Backend nicht.
    - Verwende die `transform`-Methode von zod, um einen Leerstring in `undefined` umzuändern
    - Um dein aktualisiertes Schema zu testen, musst du das Formular ausfüllen und den Speichern-Button betätigen
      - Dann siehst du in `handleSave` das "transformierte" Schema, d.h. da müsste bei einem Leerstring dann `undefined` für `specialRequests` eingetragen sein.
2. Beschreibe eine neue Mutation zum Speichern der Daten
    - Den Endpunkt ist HTTP `POST /api/reservations`
    - Der Payload entspricht dem Inhalt unseres Formulars
        - Den passenden TypeScript-Typen (`NewReservation`) findest du in `src/data.ts`
3. Verwende die Mutation in `handleSave` in deinem `ReservationEditor`
4. Der Speichern-Button soll disabled sein, während die Mutation läuft
    - zum Testen kannst du die Mutation künstlich verzögern, indem du `?slow=2000` als Search Parameter an die URL hängen
5. Wenn die Mutation abgeschlossen wurde, gib eine Meldung aus ("Erfolgreich", "Hat nicht geklappt")
    - Als UI kannst du dir selbst etwas überlegen oder du verwendest die fertige `EditorSnackbar`-Komponente (
      `src/components/EditorSnackbar.tsx`)
    - Wenn die Mutation erfolgreich war, soll außerdem das Formular zurückgesetzt werden
    - Zum Testen eines Fehlers kannst du als `expectedGuests` einen Wert höher als 200 einstellen. Im Backend werden Werte, die über 200 sind abgelehnt.
      - würde man in einer echten Anwendung wohl auch im zod-Typen des Forms entsprechend abbilden (`max(200)`), hier verwenden wir das nur, um Fehler zu provozieren
6. Kannst du das Formular so erweitern, dass die Meldung, die nach einer Mutation angezeigt wird, verschwindet, sobald etwas im Formular geändert wird?

# Material

- zod `transform`: https://zod.dev/api?id=transforms
- `useMutation` (https://tanstack.com/query/latest/docs/framework/react/reference/useMutation#usemutation)
    - insb. `mutateAsync`, `reset`, `isError`, `isSuccess`, `isPending`
- `useForm`
    - `reset`: https://react-hook-form.com/docs/useform/reset
    - `subscribe`: https://react-hook-form.com/docs/useform/subscribe


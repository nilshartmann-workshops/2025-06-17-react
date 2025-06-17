# Validierung mit Zod

# Files

- src/types.ts
- src/types.test.ts (bekommst du von mir)
- src/queries.ts

# Aufgabe

* Ersetze die TypeScript-Typen in `queries.ts` durch Schema-Beschreibungen mit zod

# Schritte

### Importieren von zod

* Achtung! **Wir verwenden zod v4**. Der Import des `z`-Objektes muss so aussehen:
    * ```typescript
      import { z } from "zod/v4"; // <--- Achtung "/v4" benutzen!
      ```

1. Erzeuge die `zod`-Schema-Objekte, die genauso heißen sollen, wie die bisherigen TypeScript-Typen:
    - `TimeRange`
    - `Reservation`
    - Für die Zeitangaben in `Reservation` soll ein eigener Zod-Typ beschrieben werden (
      `IsoDateTime`), der einen Zeitpunkt im ISO8601-Format mit Zeitzone beschreibt.
    - Würdest du für `OrderBy` auch einen zod-Typen erzeugen? Warum? Warum nicht? Wofür?
2. Kommentiere die bestehenden TypeScript-Typen aus
3. Lass dir von Zod mit `z.infer` die TypeScript-Typen generieren
4. Sowohl die Zod-Schema-Objekte als auch die TypeScript-Typen musst du aus dem Modul exportieren.
5. Wenn du dein Projekt jetzt baust (
   `pnpm build`) sollte es keine Compile-Fehler geben, wenn deine "neuen" TypeScript-Typen, die zod ableitet, den bisherigen TypeScript-Typen entsprechen
6. Du bekommst von mir eine Testdatei, die du in dein `src`-Ordner kopieren kannst. (`src/types.test.ts`)
    - Die Tests kannst du mit `pnpm tests:zod` oder `npm run tests:zod` ausführen
    - Wenn die Typen korrekt beschrieben sind, sollten die Tests grün sein ☺️
7. Verwende deine Zod-Typen in `queries.ts`, um das Ergebnis der beiden Queries zu validieren
    - In den Query-Funktionen solltest du ohne explizite Type-Angaben (z.B. `<Reservation[]>`) auskommen

# Material

- zod: https://zod.dev/
    - zod v4: https://zod.dev/v4
    - Why `zod/v4` in import: https://github.com/colinhacks/zod/issues/4371
- basic usage: https://zod.dev/basics
- define schemas: https://zod.dev/api
- infering typescript types: https://zod.dev/basics?id=inferring-types
- parse function: https://zod.dev/basics?id=parsing-data

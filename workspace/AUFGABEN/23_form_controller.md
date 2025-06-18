# Verwenden einer nicht-React-Hook-Form-kompatiblen Komponente

# Files

- src/components/ReservationEditor.tsx
- src/data.ts

# Aufgabe

* Erweitere das Formular mit der `FoodTruckSelect`-Komponente, um einen Food Truck auswählen zu können

# Schritte

1. Erweitere dein zod-Schema für das Formular
    - Das Feld muss ein nicht-leerer String sein und `foodTruckId` heißen
2. Binde die `FoodTruckSelect`-Komponente im Formular ein
    - Die `FoodTruckSelect`-Komponente erwartet vier Properties:
        - `availableFoodTrucks`, eine Liste mit FoodTruck-Objekten (s.u.)
        - `selectedFoodTruckId`: Ausgewählter Foodtruck
        - `onSelectedFoodTruckIdChange`: Callback-Funktion, die aufgerufen wird, wenn in der
          `FoodTruckSelect`-Komponente die Auswahl geändert wurde (Paramter: neue `foodTruckId`)
        - `errorMessage` (optional): Ein String mit einer Fehlermeldung, die angezeigt werden soll
    - Da die API dieser Komponenten nicht mit der `register`-Funktion von React Hook Form kompatibel ist, musst du die
      `Controller`-Komponente von React Hook Form verwenden, um die Komponente für unser Formular zu adaptieren.
3. Wenn du die `FoodTruckSelect`-Komponente mit der
   `Controller`-Komponente verbunden hast und die Auswahl funktioniert, überprüfe:
    - wird eine Fehlermeldung angezeigt, wenn du das Formular abschickst, aber keinen Food Truck ausgewählt hast?
    - wenn das Formular korrekt ausgefüllt und submitted ist, wird in den Formular-Daten auf der Konsole die Id des ausgewählten Food Trucks angezeigt?
    - Gibt es auf der Browser Konsole Fehler/Warnungen?

# Beispiel Daten für Foodtrucks

1. Für das `availableFoodTrucks`-Property kannst du entweder die `foodTrucks` aus der Datei `data.ts` verwenden
    - Diese werden dort als statisches Array exportiert.
    - In einer echten Anwendung werden diese Daten natürlich vom Server gelesen

2. Du kannst dir einen (Suspense) Query bauen, um die Foodtrucks vom Backend zu lesen.
    - Der Endpunkt ist `http://localhost:7200/api/foodtrucks`.
    - Der Endpunkt liefert ein Array mit FoodTruck-Objekten zurück, die du so an die
      `FoodTruckSelect`-Komponente übergeben kannst

# Material

- React Hook Form `Controller` Komponente: https://react-hook-form.com/docs/usecontroller/controller
  - Für uns insbesondere wichtig:
    - `name`
    - `control`
    - und `render` (von den `render`-Parametern brauchst du `field` und `fieldState`)
- `defaultValues` für `useForm`: https://react-hook-form.com/docs/useform#defaultValues
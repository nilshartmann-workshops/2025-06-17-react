import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";

import { calculatePrice, foodTrucks } from "../data.ts";
import { useCreateReservationMutation } from "../queries.ts";
import { TimeRange } from "../types.ts";
import EditorSnackbar from "./EditorSnackbar.tsx";
import FoodTruckSelect from "./FoodTruckSelect.tsx";

// Duck Typing
// type A = { lastname: string}
// type B = { lastname: string}
//
// const a:A = {lastname: "Klaus"}
// const b:B = a;

const ReservationFormState = z.object({
  customerName: z
    .string()
    .nonempty({ error: "Bitte geben Sie einen Kundennamen ein." }), // TextField
  foodTruckId: z.string().nonempty("Please select your desired Food Truck"),
  expectedGuests: z
    .number()
    .min(5, "Sie müssen mindestens fünf Leute einladen"), // TextField type=number
  specialRequests: z
    .string()
    .nullish()
    // Die API im Backend erlaubt keine Leerstrings :-(
    // deswegen hier Leerstring (und null) in "undefined" konvertieren
    .transform((val) => (!val ? undefined : val)),
  // .refine((val) => !val || val === "Pizza"), //  // TextField
  timeRange: TimeRange.refine(
    (value) => {
      return dayjs(value.start).isBefore(value.end);
    },
    {
      error: "Bitte wählen Sie ein End-Datum nach dem Start-Datum aus",
      path: ["end"],
    },
  ),
});
type ReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReserverationEditor() {
  const form = useForm({
    resolver: zodResolver(ReservationFormState),
    defaultValues: {
      // expectedGuests: 100,
      foodTruckId: "",
    },
  });

  const [timeRange, expectedGuests] = form.watch([
    "timeRange",
    "expectedGuests",
  ]);
  const expectedPrice = calculatePrice(timeRange, expectedGuests);

  const mutation = useCreateReservationMutation();

  const handleSave = async (data: ReservationFormState) => {
    console.log("Handle Save, data: ", data);

    try {
      await mutation.mutateAsync(data);

      // nach ERFOLGREICHER Mutation das Formular wieder leer machen
      form.reset();
    } finally {
      // Fachliche Anforderung:
      //  - wenn eine Mutation (erfolgreich oder mit Fehler) ausgeführt wurde,
      //    wird eine Meldung angezeigt ("Speichern erfolgreich" o.ä., s.u.)
      //    Diese Meldung soll nur solange stehen bleiben, bis das Formular erneut
      //    verändert wird
      // Mit form.subscribe können wir auf Änderungen am Formular-Inhalt
      // reagieren
      //  (mit dem Parameter kann man genau einstellen, für welche
      //   Änderungen man sich interessiert, wir interessieren uns
      //   für alle WERTE, die sich ändern)
      const unsubscribe = form.subscribe({
        formState: {
          values: true,
        },
        callback: (data) => {
          // Ein WERT im Formular wurde verwenden
          console.log("Callback - data", data.values);

          // ...dann mutation zurücksetzen (damit Meldungen verschwinden)
          mutation.reset();

          // und unseren Listener wieder abmelden (bis zur nächsten
          // Mutation interessieren wir uns nicht für Datenänderungen)
          unsubscribe();
        },
      });
    }
  };

  const handleError = (error: any) => {
    console.log("Handle Error, error: ", error);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave, handleError)}>
      <Typography variant={"h3"}>Reserve your food trucks</Typography>

      {/*Customer name*/}
      <FormControl fullWidth margin="normal">
        <TextField
          {...form.register("customerName")}
          label={"Customer"}
          error={form.formState.errors["customerName"] !== undefined}
          helperText={form.formState.errors["customerName"]?.message}
        />
      </FormControl>

      {/*Food Truck Auswahl*/}
      <Controller
        name={"foodTruckId"}
        control={form.control}
        render={(fieldInfo) => {
          return (
            <FoodTruckSelect
              errorMessage={fieldInfo.fieldState.error?.message}
              availableFoodTrucks={foodTrucks}
              selectedFoodTruckId={fieldInfo.field.value}
              onSelectedFoodTruckIdChange={(newFoodTruckId) => {
                fieldInfo.field.onChange(newFoodTruckId);
              }}
            />
          );
        }}
      />

      {/*Expected Guests*/}
      <FormControl fullWidth margin="normal">
        <TextField
          {...form.register("expectedGuests", {
            valueAsNumber: true,
          })}
          label={"Expected Guests"}
          error={form.formState.errors.expectedGuests !== undefined}
          helperText={form.formState.errors["expectedGuests"]?.message}
          type={"number"}
        />
      </FormControl>

      <Stack direction="row" spacing={2} mt={4} mb={4}>
        <FormControl fullWidth margin="normal">
          <Controller
            control={form.control}
            name={"timeRange.start"}
            render={({ field }) => {
              return (
                <DateTimePicker
                  slotProps={{
                    textField: {
                      error: !!form.formState.errors.timeRange?.start,
                      helperText:
                        form.formState.errors.timeRange?.start?.message,
                    },
                  }}
                  label="Start"
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(v) => {
                    field.onChange(v?.toISOString());
                  }}
                />
              );
            }}
          />
          <Button
            variant="text"
            size="small"
            sx={{ alignSelf: "flex-start", mt: 1 }}
            onClick={() => {
              form.setValue("timeRange.start", dayjs().toISOString());
            }}
          >
            Now
          </Button>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Controller
            control={form.control}
            render={({ field }) => {
              return (
                <DateTimePicker
                  slotProps={{
                    textField: {
                      error: !!form.formState.errors.timeRange?.end,
                      helperText: form.formState.errors.timeRange?.end?.message,
                    },
                  }}
                  label="End"
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(v) => {
                    field.onChange(v?.toISOString());
                  }}
                />
              );
            }}
            name={"timeRange.end"}
          />
          <Button
            variant="text"
            size="small"
            sx={{ alignSelf: "flex-start", mt: 1 }}
            onClick={() => {
              form.setValue(
                "timeRange.end",
                dayjs().add(1, "day").toISOString(),
              );
            }}
          >
            Tomorrow
          </Button>
        </FormControl>
      </Stack>

      <FormControl fullWidth margin="normal">
        <TextField
          {...form.register("specialRequests")}
          label={"Special requests"}
        />
      </FormControl>

      <Typography color="success.main" variant="body1">
        Price (approx.) {expectedPrice}
      </Typography>

      <ButtonGroup variant="outlined" size={"large"} sx={{ marginTop: "2rem" }}>
        <Button type={"submit"}>Add reservation</Button>
        <Button onClick={() => form.reset()}>Clear</Button>
      </ButtonGroup>

      {mutation.isError && (
        <EditorSnackbar severity={"error"}>
          Could not save your reservation
        </EditorSnackbar>
      )}
      {mutation.isSuccess && (
        <EditorSnackbar severity={"success"}>Reservation saved</EditorSnackbar>
      )}
    </form>
  );
}

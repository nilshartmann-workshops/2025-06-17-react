import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
  TextField,
  FormHelperText,
  Stack,
  ButtonGroup,
  Typography,
} from "@mui/material";
import { z } from "zod/v4";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchFoodTrucksOpts,
  useCreateReservationMutation,
} from "../../queries.ts";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useEffect } from "react";
import { TimeRange } from "../../types.ts";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import OrderButtonBar from "../reservationlist/OrderButtonBar.tsx";

// Diskutieren:
//    Foodtrucks per Prop über oder direkt hier laden
//     -> Hier machen wir es per Prop, weil wir uns im ersten Schritt noch nicht
//        mit TS Query beschäftigt haben (evtl)
//     -> Nachteil Prop: wenn die sich ändern, während der Editor gemounted ist,
//        ist es sehr schwer die zu aktualisieren
//    -> Vorteil Props: Entkopplung, einfacher zutesten

// Zeigen:
//  -> spezialisierte Bibliothek für MUI https://www.npmjs.com/package/react-hook-form-mui

// Vorgehen:
//  -> Idee von React Hook Form OHNE Mui nur mit einem input-Feld
//      -> Detail: wie funktioniert Spread-Operator und ...register
//  -> input-Feld in eigene Komponente verschieben
//      -> jetzt entspricht die API der Komponente nicht der API von <input />
//         und passt nicht zu register
//      -> Controller zeigen
//  -> Dann auf MUI umstellen
//

const ReservationFormState = z.object({
  customerName: z.string().nonempty({ error: "Please enter a customer name" }),
  // muss per select gewählt werden
  foodTruck: z.string().nonempty(),
  // .nonempty({ error: "Please select a food truck" })
  // .transform((v) => (v === "" ? undefined : v)),
  // hier werden wir das Problem haben, eine Zahl in einen String zu konvertieren (?)
  expectedGuests: z
    .number()
    .min(5, { error: "You have to invite at least 5 guests" }),
  // hier werden wir das Problem haben, mit null <-> (leer-)string konvertierung
  specialRequests: z
    .string()
    .transform((val) => {
      // ACHTUNG! Das Transform führt NICHT dazu, das man den transformierten
      // Wert im State hat (in den DATA im Submit aber schon!)
      console.log("VAL", val);
      if (val === "") {
        console.log("set val to undefined");
        return null;
      }
      return val;
    })
    .nullish(),
  timeRange: TimeRange,
});
type ReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReservationEditor() {
  const { data: foodTrucks } = useSuspenseQuery(fetchFoodTrucksOpts());

  const mutation = useCreateReservationMutation();

  const form = useForm<ReservationFormState>({
    resolver: standardSchemaResolver(ReservationFormState),
    defaultValues: {
      foodTruck: "",
    },
  });

  const subscribe = form.subscribe;

  useEffect(() => {
    return subscribe({
      formState: {
        values: true,
      },
      callback: (data) => console.log("DATA IN SUB", data),
    });
  }, [subscribe]);

  const handleSubmit = (data: ReservationFormState) => {
    console.log("DATA", data);

    mutation.mutate(data);
  };

  const handleError = (err: any) => {
    console.log("ERROR", err);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit, handleError)}>
      <Typography variant={"h3"}>Reserve your food trucks</Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Customer"
          variant="outlined"
          fullWidth
          margin="normal"
          {...form.register("customerName")}
          error={!!form.formState.errors["customerName"]}
          helperText={form.formState.errors["customerName"]?.message}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="foodtruck-selector-label">Food Truck</InputLabel>
        <Controller
          control={form.control}
          render={(f) => (
            <Select
              error={!!form.formState.errors["foodTruck"]?.message}
              label="Food Truck"
              labelId={"foodtruck-selector-label"}
              fullWidth
              {...f.field}
            >
              {foodTrucks.map((f) => (
                <MenuItem key={f.id} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          )}
          name={"foodTruck"}
        />
        {form.formState.errors["foodTruck"] !== undefined && (
          <FormHelperText error={true}>
            {form.formState.errors["foodTruck"].message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Special Requests"
          variant="outlined"
          fullWidth
          margin="normal"
          {...form.register("specialRequests")}
          error={!!form.formState.errors["specialRequests"]?.message}
          helperText={form.formState.errors["specialRequests"]?.message}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Expected Guests"
          variant="outlined"
          fullWidth
          type={"number"}
          margin="normal"
          {...form.register("expectedGuests", { valueAsNumber: true })}
          error={!!form.formState.errors["expectedGuests"]}
          helperText={form.formState.errors["expectedGuests"]?.message}
        />
      </FormControl>

      <Stack direction="row" spacing={2} mt={4} mb={4}>
        <FormControl fullWidth margin="normal">
          <Controller
            control={form.control}
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
            name={"timeRange.start"}
          />
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
        </FormControl>
      </Stack>
      <ButtonGroup variant="outlined">
        <Button variant={"contained"} type="submit">
          Request reservation
        </Button>
        <Button onClick={() => form.reset()}>Clear</Button>
      </ButtonGroup>
    </form>
  );
}

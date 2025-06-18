import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";

import { foodTrucks } from "../data.ts";
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
  specialRequests: z.string().nullish(), //  // TextField
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

  const handleSave = (data: ReservationFormState) => {
    console.log("Handle Save, data: ", data);
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
      <FormControl fullWidth margin="normal">
        <TextField
          {...form.register("specialRequests")}
          label={"Special requests"}
        />
      </FormControl>

      <ButtonGroup variant="outlined" size={"large"} sx={{ marginTop: "2rem" }}>
        <Button type={"submit"}>Add reservation</Button>
        <Button onClick={() => form.reset()}>Clear</Button>
      </ButtonGroup>
    </form>
  );
}

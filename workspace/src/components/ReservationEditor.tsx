import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ButtonGroup,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

// Duck Typing
// type A = { lastname: string}
// type B = { lastname: string}
//
// const a:A = {lastname: "Klaus"}
// const b:B = a;

const ReservationFormState = z.object({
  customerName: z.string().nonempty(), // TextField
  expectedGuests: z.number().min(5), // TextField type=number
  specialRequests: z.string().nullish(), //  // TextField
});
type ReservationFormState = z.infer<typeof ReservationFormState>;

export default function ReserverationEditor() {
  const form = useForm({
    resolver: zodResolver(ReservationFormState),
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
        <TextField {...form.register("customerName")} label={"Customer"} />
      </FormControl>

      {/*Expected Guests*/}
      <FormControl fullWidth margin="normal">
        <TextField
          {...form.register("expectedGuests", {
            valueAsNumber: true,
          })}
          label={"Expected Guests"}
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
      </ButtonGroup>
    </form>
  );
}

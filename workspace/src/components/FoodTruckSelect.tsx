import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

type FoodTruck = { id: string; name: string };

type FoodTruckSelectProps = {
  availableFoodTrucks: FoodTruck[];
  selectedFoodTruckId: string;
  onSelectedFoodTruckIdChange(newFoodTruckId: string): void;
  errorMessage?: string;
};

export default function FoodTruckSelect({
  availableFoodTrucks,
  selectedFoodTruckId,
  onSelectedFoodTruckIdChange,
  errorMessage,
}: FoodTruckSelectProps) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="foodtruck-selector-label">Food Truck</InputLabel>
      <Select
        error={!!errorMessage}
        label="Food Truck"
        labelId={"foodtruck-selector-label"}
        fullWidth
        value={selectedFoodTruckId}
        onChange={(e) => onSelectedFoodTruckIdChange(String(e.target.value))}
      >
        {availableFoodTrucks.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
      {!!errorMessage && (
        <FormHelperText error={true}>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

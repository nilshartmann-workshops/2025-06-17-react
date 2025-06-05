import { Box, Button, ButtonGroup, type ButtonProps } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import type { OrderBy } from "../../types.ts";

export default function OrderButtonBar() {
  const [searchParams] = useSearchParams({ orderBy: "start" });
  const currentOrderBy = searchParams.get("orderBy");

  const buttonProps = (
    orderBy: OrderBy,
    label: string,
  ): ButtonProps<typeof Link> => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("orderBy", orderBy);
    const to = `/?${newSearchParams.toString()}`;
    return {
      component: Link,
      to,
      children: label,
      variant: orderBy === currentOrderBy ? "contained" : "outlined",
    };
  };

  return (
    <ButtonGroup variant="outlined">
      <Box display={"flex"} alignItems={"center"} marginX={"10px"}>
        Order by
      </Box>
      <Button component={Link} {...buttonProps("start", "Date")} />
      <Button component={Link} {...buttonProps("foodTruck", "Food Truck")} />
      <Button component={Link} {...buttonProps("customerName", "Customer")} />
      <Button component={Link} {...buttonProps("status", "Status")} />
    </ButtonGroup>
  );
}

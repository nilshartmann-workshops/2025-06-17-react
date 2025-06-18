import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet, useSearchParams } from "react-router-dom";

// Auf true setzen, um den Link zum Reservation-Editor anzuzeigen
const showCreateLink = true;

export default function AppLayout() {
  const [searchParams] = useSearchParams();
  return (
    <Container>
      <Stack spacing={4}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                align={"left"}
              >
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={`/?${searchParams.toString()}`}
                >
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Avatar src={"/icon.png"} />
                    <div>Rent a Food Truck</div>
                  </Stack>
                </Button>
              </Typography>

              {showCreateLink && (
                <Button color="inherit" component={RouterLink} to={"/create"}>
                  Reserve your truck
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>

        <Outlet />
      </Stack>
    </Container>
  );
}

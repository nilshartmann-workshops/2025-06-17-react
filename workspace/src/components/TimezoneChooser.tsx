import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Check from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

import { useTimezoneContext } from "./TimezoneContext.tsx";

const Timezones = [
  "America/Santiago",
  "Asia/Hong_Kong",
  "Europe/Berlin",
  "Pacific/Easter",
];

export default function TimezoneChooser() {
  const timezoneContext = useTimezoneContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="currently selected timezone"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccessTimeRoundedIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Timezones.map((t) => (
          <MenuItem key={t} onClick={() => timezoneContext.setTimezone(t)}>
            {t === timezoneContext.timezone ? (
              <>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                {t}
              </>
            ) : (
              <ListItemText inset>{t}</ListItemText>
            )}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CloseRoundedIcon />
          </ListItemIcon>
          Close
        </MenuItem>
      </Menu>
    </div>
  );
}

//
// const handleChange = (event: SelectChangeEvent) => {
//   timezoneContext.setTimezone(event.target.value as string);
// };
//
// return (
//   <FormControl margin="normal">
//     <InputLabel id="timezone-selector-label">Timezone</InputLabel>
//     <Select
//       sx={{ color: "white" }}
//       label="Timezone"
//       labelId={"timezone-selector-label"}
//       fullWidth
//       value={timezoneContext.timezone}
//       onChange={handleChange}
//     >
//       {Timezones.map((f) => (
//         <MenuItem key={f} value={f}>
//           {f}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// );

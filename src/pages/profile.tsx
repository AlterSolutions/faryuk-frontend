
import React from "react";

// mui imports
import {
  Box,
  Button,
  Alert,
  TextField,
  FormControl,
  Grid,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

// mui icons imports
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { a11yProps, TabPanel } from "../components/atomic/tabPanel";
import UserHandler from "../api/UserHandler";
import { ColorModeContext } from "../App";


export default function Profile() {
  const [username, setUsername] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertError, setAlertError] = React.useState(true);
  const [alertContent, setAlertContent] = React.useState("");

  React.useEffect(() => {
    if(username === "") {
      UserHandler.isLoggedin()
      .then((data) => {
        if(data.status === "Success") {
          setUsername(data.body.username);
        }
     })
    }
  })

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const passwordChange = (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {alert ? <Alert severity={alertError ? "error" : "success"}>{alertContent}</Alert> : null}
      </Grid>
      <Grid item>
        <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            fullWidth
            disabled
            name="username"
            label="Username"
            variant="standard"
            value={username}
            onChange={(event) => { setUsername(event.target.value as string) }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            fullWidth
            type="password"
            name="oldpassword"
            label="Current password"
            variant="standard"
            value={currentPassword}
            onChange={(event) => { setCurrentPassword(event.target.value as string) }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            fullWidth
            name="password1"
            type="password"
            label="New password"
            variant="standard"
            value={password}
            onChange={(event) => { setPassword(event.target.value as string) }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            fullWidth
            name="password2"
            type="password"
            label="Confirm new password"
            variant="standard"
            value={password2}
            onChange={(event) => { setPassword2(event.target.value as string) }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              UserHandler.changePassword({currentPassword, password, password2})
              .then((data) => {
                if (data.status === "Success") {
                  setAlertError(false);
                  setAlert(true);
                  setAlertContent("Password changed successfully");
                } else {
                  setAlertError(true);
                  setAlert(true);
                  setAlertContent(data.body);
                }
              })
            }}
            color="info"
          >
            Submit
          </Button>
        </Box>
       </Grid> 
    </Grid>
  );

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const themeSettings = (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );

  return (<Box
    justifyContent="center"
    alignItems="center"
  >
    <Box sx={{ border: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
        <Tab label="Password change" {...a11yProps(0)} />
        <Tab label="Theme settings" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {passwordChange}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {themeSettings}
      </TabPanel>
    </Box>
  </Box>);
}

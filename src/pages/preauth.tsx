import * as React from 'react';

// @mui imports
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { a11yProps, TabPanel } from "../components/atomic/tabPanel";

// Custom imports
import Login from "../components/group/login";
import Register from "../components/group/register";
import { ILoginData, IRegisterData, IReturn } from "../api/structs";
import UserHandler from '../api/UserHandler';


function authenticate(data: ILoginData): Promise<IReturn> {
  return UserHandler.login(data);
}

function registerUser(data: IRegisterData): Promise<IReturn> {
  return UserHandler.register(data);
}

export default function PreAuth() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (<Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Box sx={{ border: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login submitFunction={authenticate}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register submitFunction={registerUser} />
      </TabPanel>
    </Box>
  </Box>);
}

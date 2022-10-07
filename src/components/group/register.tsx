
import React from "react";
import { useState } from "react";

// @mui imports
import {
  Alert,
  Box,
  Button,
  TextField,
} from "@mui/material";

// @mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from '@mui/icons-material/Login';
import PasswordIcon from "@mui/icons-material/Password";
import KeyIcon from "@mui/icons-material/VpnKey";

// custom imports
import { IReturn, APIHandler } from "../../api/structs";

export default function Register(props: {submitFunction: APIHandler}) {
  const handleSubmit = (e : React.FormEvent, submitFunction : APIHandler) => {
    e.preventDefault();
    submitFunction({username, password, password2, API_REGISTER_KEY})
      .then((result: IReturn) => { 
        if (result.status === "Success") {
          setAlertError(false);
          setAlert(true);
          setApiKey("");
          setUsername("");
          setPassword("");
          setPassword2("");
          setAlertContent("Created account successfully. Go to login...");
        } else {
          setAlertError(true);
          setAlert(true);
          setAlertContent(result.body);
        }
      });
    }
  
  const [API_REGISTER_KEY, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(true);
  const [alertContent, setAlertContent] = useState("");


  return (<form id="register-form" onSubmit={(event) => handleSubmit(event, props.submitFunction)}>
    {alert ? <Alert severity={alertError ? "error" : "success"}>{alertContent}</Alert> : null}
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField name="API_REGISTER_KEY" value={API_REGISTER_KEY} type="text" label="Registration Key" variant="standard" onChange={(event) => setApiKey(event.target.value)} />
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField name="username" value={username} label="Username" variant="standard" onChange={(event) => setUsername(event.target.value)}/>
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField name="password" type="password" value={password} label="Password" variant="standard" onChange={(event) => setPassword(event.target.value)} />
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField name="password2" type="password" value={password2} label="Confirm Password" variant="standard" onChange={(event) => setPassword2(event.target.value)} />
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <Button type="submit" color="info" endIcon={<LoginIcon />}>
        Register
      </Button>
    </Box>
  </form>);
}

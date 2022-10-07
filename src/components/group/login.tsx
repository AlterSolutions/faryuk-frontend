
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

// custom imports
import { IReturn, APIHandler } from "../../api/structs";

export default function Login(props: {submitFunction: APIHandler}) {
  const handleSubmit = (e : React.FormEvent, submitFunction : APIHandler) => {
    e.preventDefault();
    submitFunction({username, password})
      .then((result: IReturn) => { 
        if (result.status === "Success") {
          setAlertError(false);
          setAlert(true);
          setAlertContent("Connected successfully. Redirecting ...");
          window.location.href = "/home";
        } else {
          setAlertError(true);
          setAlert(true);
          setAlertContent(result.body);
        }
      });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(true);
  const [alertContent, setAlertContent] = useState("");

  return (<form id="login-form" onSubmit={(e : React.FormEvent) => handleSubmit(e, props.submitFunction)}>
    {alert ? <Alert severity={alertError ? "error" : "success"}>{alertContent}</Alert> : null}
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)} variant="standard" />
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <PasswordIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField type="password" value={password} onChange={(event) => setPassword(event.target.value)} label="Password" variant="standard" />
    </Box>
    <Box display="flex" justifyContent="flex-end">
      <Button type="submit" color="info" endIcon={<LoginIcon />}>
        Login
      </Button>
    </Box>
  </form>);
}

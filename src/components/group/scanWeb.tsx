// @mui imports
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// @mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// react imports
import React from "react";
import { useNavigate } from "react-router-dom";

// custom imports
import { IReturn } from "../../api/structs";
import { IScanWebProps } from "../structs";
import ScannerSelectionModal from "../../components/group/scannerSelectionModal";

export default function ScanWeb(props: IScanWebProps) {
  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    setScannersOpen(true);
  }

  const id = props.host;

  const submitFunction = (scanners: string[]) => {
    setOpen(true);
    setScannersOpen(false);
    props.submitFunction({id, webPort, wordlist, useWildcard, ssl, statusCodes, excludeBuster, base, scanners})
    .then((result: IReturn) => { 
      navigate("/history")
    }).catch((result: IReturn) => {
      navigate("/history")
    });
  }

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [scannersOpen, setScannersOpen] = React.useState(false);

  const [wordlist, setWordlist] = React.useState("");
  const [webPort, setWebPort] = React.useState("");
  const [statusCodes, setStatusCodes] = React.useState("200,204,301,302,307,401,403");
  const [base, setBase] = React.useState("");
  const [excludeBuster, setExcludeBuster] = React.useState("");
  const [useWildcard, setUseWildcard] = React.useState(false);
  const [ssl, setSsl] = React.useState(false);

  const [wordlists, setWordlists] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (wordlists.length === 0) {
      props.wordlists
        .then((res : IReturn) => setWordlists(res.body))
        .catch(e => setWordlists(["error..."]))
    }
  });

  return (
    <>
    <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item container direction="column" spacing={2} xs={6}>
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={() => setOpen(false) }
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="port"
                label="Port"
                variant="standard"
                value={webPort}
                onChange={(event) => { setWebPort(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="base"
                label="Base"
                variant="standard"
                value={base}
                onChange={(event) => { setBase(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="statusCode"
                label="StatusCodes"
                variant="standard"
                value={statusCodes}
                onChange={(event) => { setStatusCodes(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="exclude"
                label="Grep -v"
                variant="standard"
                value={excludeBuster}
                onChange={(event) => { setExcludeBuster(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel>Wordlist</InputLabel>
              <Select
                fullWidth
                value={wordlist}
                label="Wordlist"
                onChange={(event) => { setWordlist(event.target.value as string) }}
              >
                {wordlists ? wordlists.map(item => (
                <MenuItem key={"w"+item} value={item}>{item}</MenuItem>
                )) : null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    value={ssl}
                    onChange={ (event) => { setSsl(event.target.checked) }}
                  />
                }
                label="SSL" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    value={useWildcard}
                    onChange={ (event) => { setUseWildcard(event.target.checked) }}
                  />
                }
                label="Wildcard" />
            </FormGroup>
          </Grid>
          
          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" color="info" endIcon={<PlayArrowIcon />}>
                Scan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </form>

      <ScannerSelectionModal
        id="1"
        open={scannersOpen}
        setOpen={setScannersOpen}
        submitFunction={submitFunction}
      />
    </>
  );
}

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
import { IReturn, IGroupData } from "../../api/structs";
import { IScanProps } from "../structs";
import ScannerSelectionModal from "../../components/group/scannerSelectionModal";

export default function ScanSingle(props: IScanProps) {
  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    setScannersOpen(true);
  }

  const submitFunction = (scanners: string[]) => {
    setOpen(true);
    setScannersOpen(false);
    props.submitFunction({host, portlist, dirlist, idGroup, rescan, scanners})
    .then((result: IReturn) => { 
      navigate("/history")
    }).catch((result: IReturn) => {
      navigate("/history")
    });
  }

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [scannersOpen, setScannersOpen] = React.useState(false);

  const [host, setHost] = React.useState("");
  const [portlist, setPortlist] = React.useState("");
  const [dirlist, setWordlist] = React.useState("");
  const [idGroup, setGroup] = React.useState("");
  const [rescan, setRescan] = React.useState(false);

  const [groups, setGroups] = React.useState<IGroupData[]>([]);
  const [portlists, setPortlists] = React.useState<string[]>([]);
  const [wordlists, setWordlists] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (portlists.length === 0) {
      props.groups
        .then((res : IReturn) => setGroups(res.body))
      props.wordlists
        .then((res : IReturn) => setWordlists(res.body))
        .catch(e => setWordlists(["error..."]))
      props.portlists
        .then((res : IReturn) => setPortlists(res.body))
        .catch(e => setPortlists(["error..."]))
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
                name="host"
                label="Host"
                variant="standard"
                value={host}
                onChange={(event) => { setHost(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel>Group</InputLabel>
              <Select
                fullWidth
                value={idGroup}
                label="Group"
                onChange={ (event) => { setGroup(event.target.value as string)} }
              >
                {groups ? groups.map(item => (
                <MenuItem key={"g"+item.id} value={item.id}>{item.name}</MenuItem>
                )) : null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel>Port list</InputLabel>
              <Select
                fullWidth
                value={portlist}
                label="Port list"
                onChange={(event) => { setPortlist(event.target.value as string) }}
              >
                {portlists ? portlists.map(item => (
                <MenuItem key={"p"+item} value={item}>{item}</MenuItem>
                )) : null}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel>Wordlist</InputLabel>
              <Select
                fullWidth
                value={dirlist}
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
                    value={rescan}
                    onChange={ (event) => { setRescan(event.target.checked) }}
                  />
                }
                label="Rescan" />
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

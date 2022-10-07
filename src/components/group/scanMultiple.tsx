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
} from "@mui/material";

// @mui icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// react imports
import React from "react";
import { useNavigate } from "react-router-dom";

// custom imports
import { IReturn, IGroupRow } from "../../api/structs";
import { IScanProps } from "../structs";
import ScannerSelectionModal from "../../components/group/scannerSelectionModal";

export default function ScanMultiple(props: IScanProps) {
  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    setScannersOpen(true);
  }

  const submitFunction = (scanners: string[]) => {
    setOpen(true);
    setScannersOpen(false);
    const formData : any = new FormData();
    formData.append("hosts", hosts);
    formData.append("portlist", portlist);
    formData.append("dirlist", dirlist);
    formData.append("idGroup", idGroup);
    formData.append("rescan", rescan as unknown as string);
    formData.append("scanners", scanners.join(","));
    props.submitFunction(formData)
    .then((result: IReturn) => { 
      navigate("/history")
    }).catch((result: IReturn) => {
      navigate("/history")
    });
  }

  const [open, setOpen] = React.useState(false);
  const [scannersOpen, setScannersOpen] = React.useState(false);
  const navigate = useNavigate();

  const [portlist, setPortlist] = React.useState("");
  const [dirlist, setWordlist] = React.useState("");
  const [idGroup, setGroup] = React.useState("");
  const [labelValue, setLabelValue] = React.useState("select file...");
  const [hosts, setHosts] = React.useState<File>();
  const [rescan, setRescan] = React.useState(false);

  const [groups, setGroups] = React.useState<IGroupRow[]>([]);
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

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    if(event.currentTarget.files === null) return;
    setHosts(event.currentTarget.files[0])
    setLabelValue(event.currentTarget.files[0].name as string)
  }

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
              <Button component="label">
                Select hosts File
                <input
                  type="file"
                  onChange={handleFileChange}
                  hidden
                />
              </Button>
            </FormControl>
            <InputLabel>{labelValue}</InputLabel>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                value={idGroup}
                label="Group"
                onChange={ (event) => { setGroup(event.target.value as string)} }
              >
                {
                  groups ? groups.map(item => (
                  <MenuItem key={"g"+item.id} value={item.id}>{item.name}</MenuItem>
                )) : null
                }
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <InputLabel id="demo-simple-select-label">Port list</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
              <InputLabel id="demo-simple-select-label">Wordlist</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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

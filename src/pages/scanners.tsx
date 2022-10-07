
import React from "react";

// @mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

// mui imports
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { IScannerData, IScannerRow } from "../api/structs";
import ScannerHandler from "../api/ScannerHandler";
import CustomTable from "../components/atomic/customTable";
import CustomModal from "../components/atomic/customModal";

const columns = [
  {
    id: "displayName",
    name: "Display Name",
  },
  {
    id: "tag",
    name: "Tag",
  },
  {
    id: "action",
    name: "Action",
  },
];

export default function Scanners() {
  const [loadRows, setLoadRows] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isWeb, setIsWeb] = React.useState<boolean>(false);
  const [isPort, setIsPort] = React.useState<boolean>(false);
  const [tag, setTag] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [cmd, setCmd] = React.useState("");
  
  const formatRow = (row : IScannerData) : IScannerRow => {
    const res = {} as IScannerRow

    res.id = row.id;
    res.displayName = row.displayName;
    res.tag = row.tag;
    res.action = (
      <IconButton onClick={() => {
        ScannerHandler.deleteScanner(row)
        .finally(() => {
          setLoadRows(true);
        });
      }}
      color="error">
        <DeleteIcon />
      </IconButton>
    );
    res.details = (
      <>
        <Typography key="cmd" component="span" variant="body2">  <> <b> Command </b>: {row.cmd} </> </Typography>
        <br/>
        <Typography key="types" component="span" variant="body2">
          <>
          <b> Type </b>:
          { row.isWeb ? <Chip key="isweb" label="Web scanner" /> : null }
          { row.isPort ? <Chip key="isport" label="Port scanner" /> : null }
          </>
        </Typography>
      </>
    );
    return res;
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        endIcon={<AddIcon />}
      >
        Add scanner
      </Button>
      <CustomTable 
        isCollapsible={true}
        fetchRows={ScannerHandler.getScanners}
        columnData={columns}
        formatRow={formatRow}
        fetchLength={ScannerHandler.getScannersLength}
        loadRows={loadRows}
        setLoadRows={setLoadRows}
      />
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Add scanner"
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="tag"
                label="Tag"
                variant="standard"
                value={tag}
                onChange={(event) => { setTag(event.target.value as string) }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="displayName"
                label="Display name"
                variant="standard"
                value={displayName}
                onChange={(event) => { setDisplayName(event.target.value as string) }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="cmd"
                label="Command"
                variant="standard"
                value={cmd}
                onChange={(event) => { setCmd(event.target.value as string) }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    value={isPort}
                    onChange={ (event) => { setIsPort(event.target.checked) }}
                  />
                }
                label="Is Port" />
            </FormGroup>
          </Grid>

          <Grid item>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Checkbox
                    value={isWeb}
                    onChange={ (event) => { setIsWeb(event.target.checked) }}
                  />
                }
                label="Is Web" />
            </FormGroup>
          </Grid>

          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <Button
              onClick={() => {
                ScannerHandler.addScanner({isWeb, isPort, tag, cmd, displayName} as IScannerData)
                .then((data) => {
                  if (data.status === "Success") {
                    window.location.href = "/scanners";
                  }
                })
                .catch((error) => {
                  // TODO : handle error
                })
              }}
                color="info"
              >
                Add 
              </Button>
            </Box>
           </Grid> 
        </Grid>
      </CustomModal>
    </>
  );
}

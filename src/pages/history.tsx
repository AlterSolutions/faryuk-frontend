
import React from "react";

// @mui icons
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";

// mui imports
import {
  Chip,
  CircularProgress,
  IconButton,
  Typography,
  Backdrop,
} from "@mui/material";

// custom imports
import CustomTable from "../components/atomic/customTable";
import CustomConfirm from "../components/atomic/customConfirm";
import HistoryHandler from "../api/HistoryHandler";
import { IHistoryData, IHistoryRow } from "../api/structs";

const columns = [
  {
    id: "host",
    name: "Host",
  },
  {
    id: "state",
    name: "State",
  },
  {
    id: "type",
    name: "Type",
  },
  {
    id: "action",
    name: "Action",
  },
];


export default function History() {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [openLoad, setOpenLoad] = React.useState(false);
  const [loadRows, setLoadRows] = React.useState(true);

  const handleDelete = () => {
    setOpenLoad(true);
    HistoryHandler.deleteHistory(id)
    .then((data) => {
      setOpenLoad(false);
      if(data.status === "Success") {
        setLoadRows(true)
        setOpen(false);
      }
    })
    .catch((error) => {
      setOpenLoad(false);
      console.log(error);
    })
  }

  const openConfirm = (id: string) => {
    setOpen(true);
    setId(id);
  }


  const formatRow = (row : IHistoryData): IHistoryRow => {
    let res = {} as IHistoryRow;

    res.id = row.id;
    res.host = (row.host ? row.host : row.domain);

    if (!row.isFinished) {
      res.state = <Chip label="OnGoing" icon={<HourglassBottomIcon />} color="warning" size="small" />
    } else if(row.isSuccess) {
      res.state = <Chip label="OK" icon={<DoneIcon />} color="success" size="small" />
    } else {
      res.state = <Chip label="KO" icon={<ErrorIcon />} color="error" size="small" />
    }

    if (row.domain) {
      res.type = <Chip label="DNS" size="small" />
    } else if(row.isWeb) {
      res.type = <Chip label="Web" size="small" />
    } else {
      res.type = <Chip label="Host" size="small" />
    }

    res.action = <IconButton onClick={() => openConfirm(row.id)} color="error"> <DeleteIcon /> </IconButton>;

    res.details = ( row.state.map((s: string) => {
        if(s[1] === "*") {
          return <Typography key={s} variant="body2" color="warning.main"> {s} </Typography>
        } else if(s[1] === "+") {
          return <Typography key={s} variant="body2" color="success.main"> {s} </Typography>
        } else if(s[1] === "-") {
          return <Typography key={s} variant="body2" color="error.main"> {s} </Typography>
        }
        return null;
      }));
    

    return res;
}
  
  return (
        <>
          <CustomTable 
            isCollapsible={true}
            isSearchable
            fetchRows={HistoryHandler.getRows}
            columnData={columns}
            formatRow={formatRow}
            fetchLength={HistoryHandler.getLength}
            loadRows={loadRows}
            setLoadRows={setLoadRows}
          />
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={openLoad}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
          <CustomConfirm
            title="Confirm delete"
            open={open}
            setOpen={setOpen}
            onConfirm={handleDelete}
            color="error"
          >
              Are you sure you want to delete history record "{id}" ?
           </CustomConfirm>
         </>
         );
}

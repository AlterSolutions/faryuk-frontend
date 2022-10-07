
import React from "react";
import { useNavigate } from "react-router-dom";

// @mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";

// mui imports
import {
  Alert,
  Backdrop,
  CircularProgress,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";


// custom imports
import CustomTable from "../components/atomic/customTable";
import CustomConfirm from "../components/atomic/customConfirm";
import { ColorType } from "../components/structs";
import ResultHandler from "../api/ResultHandler";
import SharingHandler from "../api/SharingHandler";
import UserHandler from "../api/UserHandler";
import { IResultData, IResultRow, ISharingData, IUserData } from "../api/structs";

const columns = [
  {
    id: "host",
    name: "Host",
  },
  {
    id: "ips",
    name: "IPs",
  },
  {
    id: "ports",
    name: "Ports",
  },
  {
    id: "action",
    name: "Action",
  },
];


export default function Result() {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [userId, setUserId] = React.useState<string>("");
  const [openLoad, setOpenLoad] = React.useState(false);
  const [loadRows, setLoadRows] = React.useState(true);
  const [color, setColor] = React.useState<ColorType>("error");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<React.ReactNode>();

  const navigate = useNavigate();

  const handleDelete = () => {
    setOpenLoad(true);
    ResultHandler.deleteResult(id)
    .then((data) => {
      setOpenLoad(false);
      console.log(data);
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

  const handleShare = () => {
    setOpenLoad(true);
    SharingHandler.shareResult({ idResult: id, idUser: userId } as ISharingData)
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

  const openConfirmDelete = (id: string) => {
    setOpen(true);
    setColor("error");
    setTitle("Confirm delete");
    setContent("Are you sure you want to delete history record " + id + " ?");
    setId(id);
  }

  const openConfirmShare = (id: string) => {
    setOpen(true);
    setColor("secondary");
    setTitle("Share with user");
    let modalContent = null;
    UserHandler.getUsers()
    .then((data) => {
      if(data.status === "Success") {
        modalContent = (
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <Select
                fullWidth
                defaultValue={""}
                onChange={(event) => {
                  setUserId(event.target.value)
                }}
              >
                {data.body ? data.body.map((item: IUserData) => (
                <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                )) : null}
              </Select>
            </FormControl>
        )
        setContent(modalContent);
      }
    })
    .catch((error) => {
      // TODO: handle errors
      modalContent = (
        <Alert severity="error"> Cannot load users. Please retry later </Alert>
      );
      setContent(modalContent);
    });
    setId(id);
  }

  const formatRow = (row : IResultData): IResultRow => {
    let res = {} as IResultRow;

    res.id = row.id;
    res.host = row.host;
    res.ips = (
      <List dense={true} disablePadding={true}>
        {row.ips.map((ip) => {
          return (
            <ListItem key={ip}>
               <ListItemText
                 primary={<Typography variant="body2"> - { ip } </Typography>}
                />
             </ListItem>
          );
        })}
        </List>
    );

    res.ports = row.openPorts.join(", ");

    res.action = (
      <>
      <IconButton onClick={() => navigate("/details/" + row.id )} color="info"> <SearchIcon /> </IconButton>
      <IconButton onClick={() => openConfirmShare(row.id)} color="secondary"> <ShareIcon /> </IconButton>
      <IconButton onClick={() => openConfirmDelete(row.id)} color="error"> <DeleteIcon /> </IconButton>
      </>
    );

    return res;
}
  
  return (
        <>
          <CustomTable 
            isCollapsible={false}
            isSearchable
            fetchRows={ResultHandler.getRows}
            columnData={columns}
            formatRow={formatRow}
            fetchLength={ResultHandler.getLength}
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
            title={title}
            open={open}
            setOpen={setOpen}
            onConfirm={() => { 
              if (color === "error") {
                handleDelete();
              } else {
                handleShare();
              }
            }}
            color={color}
          >
            { content }
           </CustomConfirm>
         </>
         );
}

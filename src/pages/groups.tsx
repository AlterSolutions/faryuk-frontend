
import React from "react";

// @mui icons
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

// mui imports
import {
  IconButton,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { IGroupData, IGroupRow, IUserData } from "../api/structs";
import GroupHandler from "../api/GroupHandler";
import UserHandler from "../api/UserHandler";
import CustomTable from "../components/atomic/customTable";
import CustomModal from "../components/atomic/customModal";

const columns = [
  {
    id: "name",
    name: "Name",
  },
  {
    id: "action",
    name: "Action",
  },
];

export default function Groups() {
  const [loadRows, setLoadRows] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openUser, setOpenUser] = React.useState<boolean>(false);
  const [name, setName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [rowId, setRowId] = React.useState("");
  const [allUsers, setAllUsers] = React.useState<IUserData[]>();

  React.useEffect(() => {
    if(!allUsers) {
      UserHandler.getUsers()
      .then((data) => {
        if(data.status === "Success") {
           setAllUsers(data.body);
        }
      })
      .finally(() => {
        setLoadRows(true);
      });
    }
  })

  const formatRow = (row : IGroupData) : IGroupRow => {
    const res = {} as IGroupRow

    res.id = row.id;
    res.name = row.name;
    res.action = (
      <IconButton onClick={() => {
        GroupHandler.deleteGroup(row)
        .finally(() => {
          setLoadRows(true);
        });
      }}
      color="error">
        <DeleteIcon />
      </IconButton>
    );
    GroupHandler.getGroupUsers({idGroup: row.id})
    .then((data) => {
      let users : IUserData[] = [];
      if(data.status === "Success") {
        if(data.body) {
          data.body.map((user: IUserData) => {
            users.push(user);
            return user;
          })
        }
        res.details = (
          <Grid>
            <Button
              onClick={() => {
                setRowId(row.id);
                setOpenUser(true);
              }}
              endIcon={<AddIcon />}
            >
              Add user to group
            </Button>
            { 
              data.body ? data.body.map((user: IUserData) => {
                return (
                  <Grid key={user.id}>
                  <Typography key={user.id} component="span" variant="body2">
                    <> - {user.username} </>
                    <IconButton onClick={() => {
                      GroupHandler.deleteUserFromGroup({idUser: user.id, idGroup: row.id})
                      .finally(() => {
                        window.location.href = "/groups";
                      });
                    }}
                    color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Typography>
                  <br/>
                  </Grid>
                );
            }) : null}
          </Grid>
        );
      }
    })
    return res;
  }

  const submitGroup = () => {
      GroupHandler.addGroup({name} as IGroupData)
      .then((data) => {
        if (data.status === "Success") {
          window.location.href = "/groups";
        }
      })
      .catch((error) => {
        // TODO : handle error
      })
    }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        endIcon={<AddIcon />}
      >
        Add group
      </Button>
      <CustomTable 
        isCollapsible={true}
        fetchRows={GroupHandler.getGroups}
        columnData={columns}
        formatRow={formatRow}
        fetchLength={GroupHandler.getGroupsLength}
        loadRows={loadRows}
        setLoadRows={setLoadRows}
      />
      <CustomModal
        open={openUser}
        setOpen={setOpenUser}
        title="Add user"
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="body1"> Select user </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ display: "flex" }} fullWidth>
              <Select
                defaultValue={""}
                onChange={(event: SelectChangeEvent<unknown>) => {
                  setUserId(event.target.value as string)
                }}
              >
                { allUsers ? allUsers.map((item: IUserData) => {
                    return <MenuItem key={item.id} value={item.id}>{item.username}</MenuItem>
                }) : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton onClick={() => {
              GroupHandler.addUserToGroup({idUser: userId, idGroup: rowId})
              .then((data) => {
                if (data.status === "Success") {
                  window.location.href = "/groups";
                }
              })
            }}
            color="info">
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CustomModal>
      <CustomModal
        open={open}
        setOpen={setOpen}
        title="Add group"
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(event) => { setName(event.target.value as string) }}
                onKeyPress={(e) => {
                    if(e.key === "Enter") {
                      e.preventDefault();
                      submitGroup();
                    }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="flex-end">
              <Button
              onClick={submitGroup}
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

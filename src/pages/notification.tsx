
import React from "react";

import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import { ISharingRow } from "../api/structs";
import SharingHandler from "../api/SharingHandler";
import CustomTable from "../components/atomic/customTable";

const columns = [
  {
    id: "host",
    name: "Host",
  },
  {
    id: "sharedBy",
    name: "Shared By",
  },
  {
    id: "action",
    name: "Action",
  },
];

export default function Notifications() {
  const [loadRows, setLoadRows] = React.useState<boolean>(true);

  const formatRow = (data: any) => {
    let res = {} as ISharingRow;

    res.host = data.resultId;
    res.id = data.id;
    res.sharedBy = data.ownerId;
    res.action = (
      <>
        <IconButton color="success" aria-label="Accept sharing" onClick={() => {
          SharingHandler.acceptSharing(data)
          .then((response: any) => {
            setLoadRows(true);
            return response.data;
          })
          .catch((error: any) => {
            // TODO: Handle error
            return error.response.data;
          });
        }}>
          <CheckIcon />
        </IconButton>
        <IconButton color="error" aria-label="Reject sharing" onClick={() => {
          SharingHandler.acceptSharing(data)
          .then((response: any) => {
            setLoadRows(true);
            return response.data;
          })
          .catch((error: any) => {
            // TODO: Handle error
            return error.response.data;
          });
        }}>
          <CancelIcon/>
        </IconButton>
      </>
    )
    return res;
  };

  return (
          <CustomTable 
            isCollapsible={false}
            fetchRows={SharingHandler.getPending}
            columnData={columns}
            formatRow={formatRow}
            fetchLength={SharingHandler.getPendingLength}
            loadRows={loadRows}
            setLoadRows={setLoadRows}
          />
  );
}

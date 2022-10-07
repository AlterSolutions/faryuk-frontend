
// @mui imports
import {
  Box,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";

// @mui icons
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import React from "react";
import { useParams } from "react-router-dom";

// Custom imports
import CustomTable from "../components/atomic/customTable";
import CustomModal from "../components/atomic/customModal";
import DetailsModal from "../components/group/detailsModal";
import ScanWeb from "../components/group/scanWeb";

import { WebResult, WebResultRow, IResultData } from "../api/structs";
import ResultHandler from "../api/ResultHandler";
import UserHandler from "../api/UserHandler";
import ScanHandler from "../api/ScanHandler";

const columns = [
  {
    id: "ssl",
    name: "SSL",
  },
  {
    id: "port",
    name: "Port",
  },
  {
    id: "screen",
    name: "Screenshot",
  },
  {
    id: "more",
    name: "More",
  }
];

export default function Details() {
  const params = useParams();
  const [result, setResult] = React.useState<IResultData>({} as IResultData);
  const [loadRows, setLoadRows] = React.useState(true);
  const [chipData, setChipData] = React.useState<string[]>([]);
  const [tagValue, setTagValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [modalContent, setModalContent] = React.useState<React.ReactNode>();

  const formatRow = (row: WebResult) : WebResultRow => {
    let res = {} as WebResultRow;

    res.id = row.port;

    res.ssl = row.ssl ? <LockIcon color="success" /> : <LockOpenIcon color="error" />;

    res.port = row.port;

    res.screen = <CardMedia sx={{ maxHeight: "600px", maxWidth: "600px" }} component="img" src={"data:image/jpeg;base64, " + row.screen.path} />;

    res.details = 
      <Box>
        {
      Object.entries(row.headers).map(([key, val]) => {
        return <Typography key={key} variant="body2">  <> <b> {key} </b>: {val} </> </Typography>;
      })}
      </Box>

    res.more = <IconButton onClick={() => {
      setOpen(true);
      setTitle("Details for port " + res.port as string);
      setModalContent(<DetailsModal
                        key={params.id as string}
                        id={params.id as string}
                        data={row} 
                       />);
    }} color="info"> <SearchIcon /> </IconButton>
    return res;
  }

  const getWebResults = () : Promise<any> => {
      return ResultHandler.getWebResults(params.id ? params.id : "");
  }

  const getLength = () : Promise<any> => {
      return ResultHandler.getWebResultsLength(params.id ? params.id : "");
  }

  const handleDelete = (tagToDelete: string) => () => {
    ResultHandler.deleteTag(result.id, tagToDelete)
    .then((data) => {
      setChipData((chips) => chips.filter((chip) => chip !== tagToDelete));
    })
    .catch((data) => {
      console.log(data);
      // TODO: handle error
    })
  }


  React.useEffect(() => {
    if(result.id === undefined) {
      ResultHandler.getResult(params.id ? params.id : "")
      .then((data) => {
        if(data.status === "Success") {
          setResult(data.body);
          setChipData(data.body.tags);
        }
      })
      .catch((error) => {
        // TODO: handle error
      });
    }
  });


  const rescan = (<IconButton onClick={() => {
      setOpen(true);
      setTitle("Web scan") 
      setModalContent(<ScanWeb
                        key={params.id as string}
                        host={result.id}
                        wordlists={ScanHandler.getWordlists()}
                        submitFunction={ScanHandler.scanWeb}
                       />);
    }} color="info"> <TravelExploreIcon /> </IconButton>
  );

  const more = (<IconButton onClick={() => {
      setOpen(true);
      setTitle("Host details") 
      setModalContent(<DetailsModal
                        key={params.id as string}
                        id={params.id as string}
                        data={result} 
                       />);
    }} color="info"> <SearchIcon /> </IconButton>
  );

  return (result.id === undefined ? null : <Box
    justifyContent="center"
    alignItems="center"
  >

    <h3>Host : {result.host} {rescan} {more} </h3>
    {chipData.map((data) => {
      return (
        <Chip
          key={data}
          label={data}
          onDelete={handleDelete(data)}
        />
      );
    })}
    <TextField
      label="tag"
      size="small"
      onKeyPress={(e) => {
        if(e.key === "Enter") {
          e.preventDefault();
          UserHandler.isLoggedin()
          .then((data) => {
            ResultHandler.addComment(result.id, data.body.id, "#" + tagValue)
            .then((data) => {
              const temp = chipData;
              temp.push("#"+tagValue);
              setChipData(temp);
              setTagValue("");
            })
            .catch((data) => {
              // TODO: handle error
              console.log(data);
            })
          })
          .catch((data) => {
            // TODO: handle error
            console.log(data);
          })
        }
      }}
      onChange={(e) => {
        setTagValue(e.target.value as string);
      }}
      value={tagValue}
    />
    <br />
    <b> Resolutions: </b>
    <br />
    {
      result.ips ? result.ips.map((ip) => {
        return (
          <Typography key={ip}>
          {ip} <br />
          </Typography>
        );
      }) : null
    }
    <b>Ports : </b> { result.openPorts ? result.openPorts.join(", ") : null }
    <CustomTable 
      isCollapsible={true}
      fetchRows={getWebResults}
      columnData={columns}
      formatRow={formatRow}
      fetchLength={getLength}
      loadRows={loadRows}
      setLoadRows={setLoadRows}
    />
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={title}
      fullScreen
    >
      {modalContent}
    </CustomModal>
  </Box>
  );
}

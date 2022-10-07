import React from "react";

// @mui imports
import {
  Alert,
  Box,
  Tab,
  Tabs
} from "@mui/material";

import Terminal, { TerminalOutput } from 'react-terminal-ui';
import Convert from "ansi-to-html";

// custom imports
import { a11yProps, TabPanel } from "../atomic/tabPanel";
import CustomTable from "../atomic/customTable";
import { DetailsModalProps, TerminalProps } from "../structs";

// api imports
import ResultHandler from "../../api/ResultHandler";
import { BusterRes, WebResult } from "../../api/structs";

const columns = [
  {
    id: "path",
    name: "Path",
  },
  {
    id: "statusCode",
    name: "Status Code",
  },
  {
    id: "size",
    name: "Size",
  },
];

const TerminalController = (props : TerminalProps) => {
  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div>
    <Terminal name={props.title} onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }>
        <TerminalOutput> { props.terminalLineData } </TerminalOutput>
      </Terminal>
    </div> 
  );
};

export default function DetailsModal(props : DetailsModalProps) {
  const [value, setValue] = React.useState<number>(0);
  const [loadRows, setLoadRows] = React.useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if(newValue === 0) {
      setLoadRows(true);
    }
    setValue(newValue);
  };

  let isWeb = 0;
  let tableBuster = null;

  if((props.data as WebResult).port) {
    const getBusterResults = async (page: number, rowsPerPage: number, search: string) : Promise<any> => {
      // TODO : implement search
      const res = await ResultHandler.getWebResults(props.id ? props.id : "")
      .then((data) => {
        for(let i = 0; i < data.body.length; i++) {
          if(data.body[i].port === (props.data as WebResult).port) {
            const len = (data.body[i].busterres.length);
            const l = (page*rowsPerPage > len) ? len : (page-1)*rowsPerPage;
            const k = ((page*rowsPerPage + rowsPerPage) > l) ? len-l : rowsPerPage;
            let arr = data.body[i].busterres.slice(l, k);
            arr.map((item: any) => {
              item['id'] = item['path'];
              return item;
            });
            return { status: "Success", body: arr };
          }
        }
      })
      .catch((error) => {
        // TODO : handle error
        return null;
      });
      return await res;
    }

    const getBusterLength = async (search: string) : Promise<any> => {
      const res = await ResultHandler.getWebResultsLength(props.id ? props.id : "")
      .then((data) => {
        for(let i = 0; i < data.body.length; i++) {
          if(data.body[i].port === (props.data as WebResult).port) {
            return { status: "Success", body: data.body[i].busterres.length };
          }
        }
      })
      .catch((error) => {
        // TODO : handle error
        return { status: "Success", body: 0 };
      });
      return await res;
    }

    const formatRow = (row: BusterRes) => {
      return row;
    }

    tableBuster = (<CustomTable
                    isCollapsible={false}
                    fetchRows={getBusterResults}
                    columnData={columns}
                    formatRow={formatRow}
                    fetchLength={getBusterLength}
                    loadRows={loadRows}
                    setLoadRows={setLoadRows}
                  />);

    isWeb = 1;
  }

  const convert = new Convert();

  return (<Box
    justifyContent="center"
    alignItems="center"
  >
    <Box sx={{ border: 1, borderColor: "divider" }}>
      <Tabs key="tabs" value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
        {
         (props.data as WebResult).port ?
            ( <Tab key="gobuster" label="GoBuster" {...a11yProps(0)} /> ) : null
        }
        {props.data.runnerOutput ? props.data.runnerOutput.map((item: any, index: number) => {
          return (<Tab key={item.id+ "a"} label={item.toolName} {...a11yProps(index+ (props.data as WebResult).port ? 1 : 0)} />)
        }) : null
        }
        <Tab label="Errors" {...a11yProps(props.data.runnerOutput ? props.data.runnerOutput.length+isWeb: isWeb)} />
      </Tabs>
        {
         (props.data as WebResult).port ?
            (
              <TabPanel key="buster" value={value} index={0}>
                {tableBuster}
              </TabPanel>
            ) : null
        }
      {props.data.runnerOutput ? props.data.runnerOutput.map((item: any, index: number) => {
        return (
          <TabPanel key={item.id+ "b"} value={value} index={index + (props.data as WebResult).port ? 1 : 0}>
            <TerminalController
              key="stdout"
              title="Standard output"
              terminalLineData={convert.toHtml(item.output)}
            />
          <br/>
            <TerminalController
              key="stderr"
              title="Standard error"
              terminalLineData={convert.toHtml(item.stderr)}
            />
          </TabPanel>
        )
      }) : null
      }
      <TabPanel key="errors" value={value} index={props.data.runnerOutput ? props.data.runnerOutput.length+isWeb: isWeb}>
        {props.data.err ? props.data.err.map((error) => {
          return (<Alert key={error} severity="error">{error}</Alert>)
        }) : <Alert key="success" severity="success"> Scan finished without errors </Alert>}
      </TabPanel>
    </Box>
  </Box>);
}

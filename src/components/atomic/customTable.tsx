// mui imports
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

// Icons import
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"; 

// React imports
import React from "react";

import {
  ICustomTableColumn,
  ICustomTableHeadProps,
  ICustomTableProps,
} from "../structs";

const CustomTableHead: React.FC<ICustomTableHeadProps> = ({ columns, isCollapsible }): JSX.Element => {
  return (
    <React.Fragment>
      <TableHead>
        <TableRow>
          {isCollapsible ? <TableCell /> : null}
          {columns.map(column =>
          (<TableCell
            key={column.id}
            align="left"
          >
            {column.name}
          </TableCell>)
          )}
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
}

function CustomRow(props: { row: any, index: number, internalColumnData: ICustomTableColumn[], isCollapsible: boolean }) {
  const [open, setOpen] = React.useState(false);
  const { row, index, internalColumnData, isCollapsible } = props;
  return (
    <React.Fragment>
      <TableRow key={index}>
        {isCollapsible ?
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          : null
        }
        {
          internalColumnData.map((elem, index) => (
            <TableCell key={elem["id"] + index} align={elem.align ? elem.align : "inherit"}>{row[elem["id"]]}</TableCell>)
          )
        }
      </TableRow>
      {isCollapsible ?
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {row["details"]}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        : null
      }
    </React.Fragment>
  );
}

const CustomTable: React.FC<ICustomTableProps> = ({ columnData, fetchRows, formatRow, isCollapsible, isSearchable, fetchLength, loadRows, setLoadRows }): JSX.Element => {
  let internalColumnData: ICustomTableColumn[] = [{
    id: "",
    name: "",
    align: "inherit",
  }];
  internalColumnData = columnData;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [rowsToPrint, setRows] = React.useState([]);
  const [length, setLength] = React.useState(0);

  const handleRows = () => {
    fetchRows(page, rowsPerPage, search).then((data: any) => {
      let rows: any = [];
      if(data.status === "Success") {
        if(data.body) {
          data.body.map((r: any) => {
            rows.push(formatRow(r));
            return rows[0];
          });
        }
        setRows(rows);
      } else {
        // TODO : show error
      }
    }).catch((error: any) => {
      // TODO : handle unexpected error
    });
  }

  const handleLength = () => {
    fetchLength(search).then((data: any) => {
      if(data.status === "Success") {
        setLength(data.body);
      } else {
        // TODO : show error
      }
    }).catch((error: any) => {
      // TODO : handle unexpected error
    });
  }

  React.useEffect(() => {
    if(loadRows) {
      handleLength();
      handleRows();
      setLoadRows(!loadRows);
    }
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLoadRows(true);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setLoadRows(true);
  };

  return (
    <React.Fragment>
      { isSearchable ? (
      <Grid container justifyContent="flex-end">
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="search"
            label="Search"
            variant="standard"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value as string);
            }}
            onKeyPress={(event) => {
              if(event.key === 'Enter') {
                setLoadRows(true);
              }
            }}
          />
        </Grid>
      </Grid>
      ) : null}
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <CustomTableHead
            columns={internalColumnData}
            isCollapsible={isCollapsible}
          />
          <TableBody>
            {
              rowsToPrint.map((row, index) => (
                <CustomRow isCollapsible={isCollapsible} key={row["id"]} row={row} index={index} internalColumnData={internalColumnData} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );

}

export default CustomTable;

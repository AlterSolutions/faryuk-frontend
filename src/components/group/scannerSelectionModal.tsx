import React from "react";

// @mui imports
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// api imports
import ScannerHandler from "../../api/ScannerHandler";
import { IScannerData } from "../../api/structs";
import { ScannerSelectionModalProps } from "../structs";
import CustomConfirm from "../atomic/customConfirm";

export default function ScannerSelectionModal(props : ScannerSelectionModalProps) {
  const [checked, setChecked] = React.useState<string[]>([]);
  const [scanners, setScanners] = React.useState<IScannerData[]>();

  React.useEffect(() => {
    if(!scanners) {
      ScannerHandler.getScanners()
      .then((data) => {
        if(data.status === "Success") {
          setScanners(data.body);
        }
      });
    }
  });

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <CustomConfirm
      open={props.open}
      setOpen={props.setOpen}
      title="Select scanners"
      color="info"
      onConfirm={() => {
        props.submitFunction(checked);
        props.setOpen(false);
      }}
     >
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {scanners ? scanners.map((value) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem
            key={value.id}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.tag + "(" + value.displayName + ")"} />
            </ListItemButton>
          </ListItem>
        );
      }) : null}
    </List>
    </CustomConfirm>
  );
}

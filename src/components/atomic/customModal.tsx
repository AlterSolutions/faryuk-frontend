// @mui material components
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

// custom imports
import { ICustomModalProps } from "../structs";

function CustomModal(props: ICustomModalProps) {
  const { children, title, open, setOpen, fullScreen } = props;
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => { setOpen(false) }}
    >

      <DialogTitle>
        <Grid container> 
          <Grid item xs={8}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={1}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        { children }
      </DialogContent>
    </Dialog>
  );
}

export default CustomModal;

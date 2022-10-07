
import React from "react";

// @mui imports
import { Grid } from "@mui/material";

// @mui icons
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

// custom imports
import CustomCard from "../components/atomic/customCard";
import InfoHandler from "../api/InfoHandler";
import { IReturn, IAppInfo } from "../api/structs";


export default function Home() {
  const [infos, setInfos] = React.useState<IAppInfo>();

  React.useEffect(() => {
    if(!infos) {
      InfoHandler.getInfos()
      .then((data: IReturn) => {
        if(data.status === "Success") {
          if(data.body.onGoing === "0") {
            data.body.onGoing = "∅";
          }
          if(data.body.failed === "0") {
            data.body.failed = "∅";
          }
          if(data.body.successful === "0") {
            data.body.successful = "∅";
          }
          setInfos(data.body);
        }
      })
      .catch((error) => {
        // TODO: handle error
      })
    }
  });
  
  return (
    <Grid container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <CustomCard title="Uptime" count={infos ? infos.uptime : "???"} icon={<AccessAlarmIcon />} color="primary.main" />
      </Grid>
      <Grid item>
        <CustomCard title="Success" count={infos ? infos.successful : "???"} icon={<DoneAllIcon />} color="success.main" />
      </Grid>
      <Grid item>
        <CustomCard title="Failed" count={infos ? infos.failed : "???"} icon={<SmsFailedIcon />} color="error.main" />
      </Grid>
      <Grid item>
        <CustomCard title="OnGoing" count={infos ? infos.onGoing : "???"} icon={<HourglassBottomIcon />} color="warning.main" />
      </Grid>
    </Grid>
  );
}

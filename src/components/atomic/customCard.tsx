// @mui material components
import {
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material";

// custom imports
import { ICustomCardProps } from "../structs";

function CustomCard(obj: ICustomCardProps) {
  return (
    <Card>
      <Box sx={{ bgcolor: obj.color, color: "text.secondary" }} display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box>
          {obj.icon}
        </Box>
        <Box textAlign="right">
          <Typography variant="button" fontWeight="light" color="text">
            {obj.title}
          </Typography>
          <Typography variant="h5">{obj.count}</Typography>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
}

export default CustomCard;

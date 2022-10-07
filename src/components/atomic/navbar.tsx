import * as React from "react";


import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from  "@mui/icons-material/Notifications";

import { useNavigate } from "react-router-dom";

import UserHandler from "../../api/UserHandler";
import SharingHandler from "../../api/SharingHandler";
import { INavbarProps } from "../structs";

export default function Navbar({isAdmin} : INavbarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = React.useState<number>();

  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
    if(!notificationCount) {
      SharingHandler.getPending()
      .then((data) => {
        if(data.status === "Success") {
          setNotificationCount(data.body.length);
        }
      })
    }
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleNavClick = (url: string) => {
    if(url === "/logout") {
      UserHandler.logout()
      .then((data) => {
        if(data.status === "Success") {
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        // TODO: handle error
      });
    } else {
      navigate(url);
    }
  };

  const menuId = "account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleNavClick("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleNavClick("/scanners")}>My runners</MenuItem>
      { isAdmin ? <MenuItem onClick={() => handleNavClick("/groups")}>Groups settings</MenuItem> : null }
      <MenuItem onClick={() => handleNavClick("/logout")}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton onClick={() => handleNavClick("/notifications")} size="large">
              { notificationCount ? (<Badge badgeContent={notificationCount} color="error"><NotificationsIcon /></Badge>) : <NotificationsIcon />}
                
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

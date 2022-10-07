import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';

// @mui imports
import {
  alpha,
  useTheme,
  styled
} from '@mui/material/styles';

import {
  Box,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton
} from '@mui/material';

// custom imports
import { routes } from "../../routes";
import { INavItemProps } from "../structs";

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem(obj: INavItemProps) {
  const theme = useTheme();

  const isActiveRoot = obj.active(obj.path);

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const navItemStyleProps = {
    component: RouterLink,
    to: obj.path,
    sx: {
      ...(isActiveRoot && activeRootStyle),
    },
  }

  return (
    <ListItemStyle
      {...navItemStyleProps}
    >
      <ListItemIconStyle>{obj.icon && obj.icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={obj.title} />
    </ListItemStyle>
  );
}

interface ISidebarProps {
  isAdmin: boolean,
  other?: any,
}

export default function Sidebar(obj: ISidebarProps) {
  const { pathname } = useLocation();
  const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false);
  const { isAdmin, ...other } = obj;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {routes.map((item) => {
          const navItemProps = {
            title: item.title,
            icon: item.icon,
            path: item.path,
            active: match,
          }
          if (item.isSidebar && (isAdmin && item.adminRequired))
            return <NavItem key={item.key} {...navItemProps} />;
          if (item.isSidebar && (!item.adminRequired))
            return <NavItem key={item.key} {...navItemProps} />;
          return null;
        })}
      </List>
    </Box>
  );
}

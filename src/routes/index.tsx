
import { ReactNode } from 'react';

// @mui icons imports
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import TocIcon from '@mui/icons-material/Toc';
import HistoryIcon from '@mui/icons-material/History';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationIcon from '@mui/icons-material/Notifications';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Custom imports
import Home from "../pages/home";
import PreAuth from "../pages/preauth";
import Results from "../pages/results";
import History from "../pages/history";
import Admin from "../pages/admin";
import Notifications from "../pages/notification";
import Scan from "../pages/scan";
import Details from '../pages/details';
import Scanners from '../pages/scanners';
import Groups from '../pages/groups';
import Profile from '../pages/profile';

export interface IRoute {
  path: string,
  key: string,
  title: string,
  component: ReactNode,
  icon: ReactNode,
  authRequired: boolean,
  adminRequired: boolean,
  isSidebar: boolean,
}

export const routes = [
  {
    key: "home",
    path: "/home",
    title: "Home",
    component: <Home />,
    icon: <HomeIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: true,
  },
  {
    key: "authentication",
    path: "/authentication",
    title: "Authentication",
    component: <PreAuth />,
    icon: <FingerprintIcon />,
    authRequired: false,
    adminRequired: false,
    isSidebar: false,
  },
  {
    key: "results",
    path: "/results",
    title: "Results",
    component: <Results />,
    icon: <TocIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: true,
  },
  {
    key: "history",
    path: "/history",
    title: "History",
    component: <History />,
    icon: <HistoryIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: true,
  },
  {
    key: "scan",
    path: "/scan",
    title: "Scan",
    component: <Scan />,
    icon: <RocketLaunchIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: true,
  },
  {
    key: "details",
    path: "/details/:id",
    title: "Detail",
    component: <Details />,
    icon: <RocketLaunchIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: false,
  },
  {
    key: "admin",
    path: "/admin",
    title: "Admin",
    component: <Admin />,
    icon: <AdminPanelSettingsIcon />,
    authRequired: true,
    adminRequired: true,
    isSidebar: true,
  },
  {
    key: "notifications",
    path: "/notifications",
    title: "Notifications",
    component: <Notifications />,
    icon: <NotificationIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: false,
  },
  {
    key: "profile",
    path: "/profile",
    title: "Profile",
    component: <Profile />,
    icon: <AccountCircleIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: false,
  },
  {
    key: "scanners",
    path: "/scanners",
    title: "My Scanners",
    component: <Scanners />,
    icon: <SmartToyIcon />,
    authRequired: true,
    adminRequired: false,
    isSidebar: false,
  },
  {
    key: "groups",
    path: "/groups",
    title: "Groups settings",
    component: <Groups />,
    icon: <SmartToyIcon />,
    authRequired: true,
    adminRequired: true,
    isSidebar: false,
  },
];

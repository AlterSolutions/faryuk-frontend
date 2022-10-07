
import { ReactNode } from "react";

// custom imports
import { APIHandler, IResultData, WebResult,  IReturn } from "../../api/structs";

// Dialog
export interface IConfirmDialogProps {
  title: string,
  children?: React.ReactNode,
  open: boolean,
  setOpen: any,
  onConfirm: () => void,
  color: "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning" | undefined,
}

// Table interfaces
export interface ICustomTableColumn {
  id: string
  name: string,
  align?: "center" | "inherit" | "justify" | "left" | "right",
}

export interface ICustomTableHeadProps {
  columns: ICustomTableColumn[],
  isCollapsible: boolean,
}

export interface ICustomTableProps {
  columnData: ICustomTableColumn[],
  fetchRows: (page: number, pageSize: number, search: string) => Promise<IReturn>,
  fetchLength: (search: string) => Promise<IReturn>,
  formatRow: (e: any) => any;
  isCollapsible: boolean,
  isSearchable?: boolean,
  loadRows: boolean,
  setLoadRows: (e: boolean) => void;
}

// tabpanel interfaces
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// protectedRoute interfaces
export interface AuthProps {
  isAuthorized: boolean;
  fallback: string;
}

// customCard interfaces
export interface ICustomCardProps {
  title: string,
  count: string,
  icon: ReactNode,
  color: string,
}

// customModal interfaces
export interface ICustomModalProps {
  children?: React.ReactNode;
  title: string,
  open: boolean,
  fullScreen?: boolean,
  setOpen: (b : boolean) => void,
}

// navbar interfaces
export interface INavbarProps {
  isAdmin: boolean,
}

// sidebar interfaces
export interface INavItemProps {
  path: string,
  title: string,
  icon: ReactNode,
  active: (path: string) => boolean,
}

// detailsModal interfaces
export interface DetailsModalProps {
  id: string,
  data: WebResult | IResultData,
}

export interface TerminalProps {
  terminalLineData: React.ReactNode,
  title: string,
}

// scannerSelectionModal interfaces
export interface ScannerSelectionModalProps {
  id: string,
  open: boolean,
  setOpen: (b: boolean) => void,
  submitFunction: (t: string[]) => void,
}


// scan interfaces
export interface IScanProps {
  submitFunction: APIHandler,
  host?: string,
  wordlists: Promise<IReturn>,
  portlists: Promise<IReturn>,
  groups: Promise<IReturn>,
  dnslists?: Promise<IReturn>,
}

export interface IScanWebProps {
  submitFunction: APIHandler,
  host: string,
  wordlists: Promise<IReturn>,
}

export type ColorType = "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning" | undefined;

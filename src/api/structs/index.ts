import React from "react";

export interface IReturn {
  status: string,
  body: any,
};

export interface ILoginData {
  username: string,
  password: string,
}

export interface IRegisterData {
  API_REGISTER_KEY: string,
  username: string,
  password: string,
  password2: string,
}

export interface IScanData {
  host: string,
  portlist: string,
  dirlist: string,
  idGroup: string,
  rescan: boolean,
  scanners: string[],
}

export interface IHistoryData {
  id: string,
  host: string,
  domain: string,
  isWeb: boolean,
  isFinished: boolean,
  isSuccess: boolean,
  state: string[],
  owner: string,
  ownerGroup: string,
  createdDate: string,
}

export interface BusterRes {
  path: string,
  statusCode: number,
  size: number,
}

export interface ScreenShot {
  path: string,
}

export interface WebResult {
  port: number,
  ssl: boolean,
  headers: any,
  busterres: BusterRes[],
  screen: ScreenShot,
  runnerOutput: any,
  createdDate: string,
  err: string[],
}

export interface WebResultRow {
  id: number,
  port: number,
  ssl: React.ReactNode,
  headers: React.ReactNode,
  details: React.ReactNode,
  more: React.ReactNode,
  screen: React.ReactNode,
}

export interface IHistoryRow {
  id: string,
  host: string,
  state: React.ReactNode,
  type: React.ReactNode,
  action: React.ReactNode,
  details: React.ReactNode,
}

export interface IResultData {
  id: string,
  host: string,
  ips: string[],
  openPorts: number[],
  webResults: WebResult[],
  tags: string[],
  runnerOutput: any,
  sharedWith: string[],
  err: string[],
  owner: string,
  ownerGroup: string,
  createdDate: string,
}

export interface IResultRow {
  id: string,
  host: string,
  ips: React.ReactNode,
  ports: string,
  action: React.ReactNode,
}

export interface ISharingData {
  id: string,
  idResult: string,
  idUser: string,
}

export interface ISharingRow {
  id: string,
  host: string,
  sharedBy: string,
  action: React.ReactNode,
}

export interface IUserData {
  id: string,
  username: string,
  password: string,
  theme: string,
  groups: IGroupData[],
}

export interface IGroupData {
  id: string,
  name: string,
}

export interface IGroupRow {
  id: string,
  name: string,
  action: React.ReactNode,
  details: React.ReactNode,
}

export interface IAppInfo {
  uptime: string,
  successful: string,
  failed: string,
  onGoing: string,
}

export interface IScannerData {
  id: string,
  tag: string,
  displayName: string,
  cmd: string,
  isWeb: boolean,
  isPort: boolean,
}

export interface IScannerRow {
  id: string,
  tag: string,
  displayName: string,
  action: React.ReactNode,
  details: React.ReactNode,
}

export type APIHandler= (e: any) => Promise<IReturn>;
export type HistoryFetcher= (page: number, pageSize: number, search: string) => Promise<IHistoryData>;

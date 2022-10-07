import { IScanData } from "./structs";
import http from "./helper/httpCommon";
import { formDataSender } from "./helper/httpCommon";

class ScanHandler {
  static async scanSingle(data: IScanData) {
    const res = await http.post("/scan", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async scanDNS(data: IScanData) {
    const res = await http.post("/domain-scan", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async scanWeb(data: IScanData) {
    const res = await http.post("/webscan", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async scanMultiple(data: IScanData) {
    const res = await formDataSender.post("/scan-multiple", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getGroups() {
    const res = await http.get("/get-groups")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getDnslists() {
    const res = await http.get("/get-dnslists")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getWordlists() {
    const res = await http.get("/get-wordlists")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getPortlists() {
    const res = await http.get("/get-portlists")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default ScanHandler;

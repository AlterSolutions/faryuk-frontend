import { IScannerData } from "./structs";
import http from "./helper/httpCommon";

class ScannerHandler {
  static async addScanner(data: IScannerData) {
    const res = await http.post("/scanner", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async deleteScanner(data: IScannerData) {
    const res = await http.delete("/scanner", { data: data })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getScanners() {
    const res = await http.get("/scanners")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getScannersLength() {
    const res = await http.get("/scanners")
    .then((response: any) => {
      response.data.body = response.data.body ? response.data.body.length : 0;
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default ScannerHandler;

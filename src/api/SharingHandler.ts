import { ISharingData } from "./structs";
import http from "./helper/httpCommon";

class SharingHandler {
  static async acceptSharing(data: ISharingData) {
    const res = await http.get("/accept-sharing/" + data.id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async declineSharing(data: ISharingData) {
    const res = await http.get("/decline-sharing/" + data.id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async shareResult(data: ISharingData) {
    const res = await http.post("/share-result", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getPending() {
    const res = await http.get("/get-pending")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getPendingLength() {
    const res = await http.get("/get-pending")
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

export default SharingHandler;

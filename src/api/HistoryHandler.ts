import { IReturn } from "./structs";
import http from "./helper/httpCommon";

class HistoryHandler {
  static async getRows(page: number, pageSize: number, search: string="") : Promise<IReturn> {
    const res = await http.get("/get-history", {
                              params: {
                                offset: page*pageSize,
                                size: pageSize,
                                search: search,
                              }
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getLength(search: string="") : Promise<IReturn> {
    const res = await http.get("/count-history", {
                              params: {
                                search: search,
                              }
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async deleteHistory(id: string) : Promise<IReturn> {
    const res = await http.delete("/history/" + id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default HistoryHandler;

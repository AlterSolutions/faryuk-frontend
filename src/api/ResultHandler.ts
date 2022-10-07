import { IReturn } from "./structs";
import http from "./helper/httpCommon";

class ResultHandler {
  static async getRows(page: number, pageSize: number, search: string="") : Promise<IReturn> {
    const res = await http.get("/get-results", {
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
    const res = await http.get("/count-results", {
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

  static async deleteResult(id: string) : Promise<IReturn> {
    const res = await http.delete("/result/" + id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getResult(id: string) : Promise<IReturn> {
    const res = await http.get("/result/" + id)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getWebResults(id: string) : Promise<IReturn> {
    const res = await http.get("/result/" + id)
    .then((response: any) => {
      response.data.body = response.data.body.webResults;
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getWebResultsLength(id: string) : Promise<IReturn> {
    const res = await http.get("/result/" + id)
    .then((response: any) => {
      response.data.body = response.data.body.webResults.length;
      return response.data
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async deleteTag(idResult: string, tag: string) : Promise<IReturn> {
    const res = await http.post("/delete-tag", {idResult, tag})
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async addComment(idResult: string, owner: string, content: string): Promise<IReturn> {
    const res = await http.post("/comment", {idResult, owner, content})
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default ResultHandler;

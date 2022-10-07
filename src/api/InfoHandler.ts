import http from "./helper/httpCommon";

class InfoHandler {
  static async getInfos() {
    const res = await http.get("/infos")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default InfoHandler;

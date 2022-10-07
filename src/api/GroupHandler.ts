import { IGroupData } from "./structs";
import http from "./helper/httpCommon";

class GroupHandler {
  static async addGroup(data: IGroupData) {
    const res = await http.post("/group", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async deleteGroup(data: IGroupData) {
    const res = await http.delete("/group", { data: data })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async addUserToGroup(data: any) {
    const res = await http.post("/group/user", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async deleteUserFromGroup(data: any) {
    const res = await http.delete("/group/user", { data: data })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getGroupUsers(data: any) {
    const res = await http.post("/get-group-users", data)
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

  static async getGroupsLength() {
    const res = await http.get("/get-groups")
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

export default GroupHandler;

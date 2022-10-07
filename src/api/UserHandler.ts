import { ILoginData, IRegisterData } from "./structs";
import http from "./helper/httpCommon";

class UserHandler {
  static async register(data: IRegisterData) {
    const res = await http.post("/register", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async login(data: ILoginData) {
    const res = await http.post("/login", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async changePassword(data: any) {
    const res = await http.post("/change-password", data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async logout() {
    const res = await http.get("/logout")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async isLoggedin() {
    const res = await http.get("/whoami")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async isAdmin() {
    const res = await http.get("/isAdmin")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async getUsers() {
    const res = await http.get("/get-users")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }

  static async defineTheme(data: string) {
    const res = await http.post("/change-theme", { theme : data })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
    return await res;
  }
}

export default UserHandler;

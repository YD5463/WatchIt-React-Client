import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const EndPoint = apiUrl + "/auth";

export async function login(user) {
  const { data: jwt } = await http.post(EndPoint, {
    email: user.username,
    password: user.password,
  });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}
export function forgotPassword(email) {
  http.post(`${EndPoint}/sendEmail`, { email });
}
export function resetPassword(token, password) {
  http.post(`${EndPoint}/resetPassword`, { token, password });
}
export function getLoggedUser() {
  try {
    const token = localStorage.getItem("token");
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

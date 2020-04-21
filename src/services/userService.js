import http from "./httpService";
import { apiUrl } from "../config.json";

const EndPoint = apiUrl + "/users";

export function register(user) {
  return http.post(EndPoint, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}

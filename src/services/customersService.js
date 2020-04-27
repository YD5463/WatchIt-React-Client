import http from "./httpService";
import { apiUrl } from "../config.json";
const EndPoint = apiUrl + "/customer";

export function getCustomers() {
  return http.get(EndPoint);
}

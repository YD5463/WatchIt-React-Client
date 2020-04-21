import http from "./httpService";
import { apiUrl } from "../config.json";
const EndPoint = apiUrl + "/genres";

export function getGenres() {
  return http.get(EndPoint);
}

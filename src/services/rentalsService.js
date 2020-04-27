import http from "./httpService";
import { apiUrl } from "../config.json";
const EndPoint = apiUrl + "/rentals";

export function getRetntals() {
  return http.get(EndPoint);
}
export function addRental(rantal){

}
export function returnRental({movieId,CustomerId}){

}
import http from "./httpService";
import { apiUrl } from "../config.json";
const EndPoint = apiUrl + "/rentals";

export function getRetntals() {
  return http.get(EndPoint);
}
export function addRental(rental) {
  return http.post(EndPoint, rental);
}
export function returnRental({ movieId, CustomerId }) {}

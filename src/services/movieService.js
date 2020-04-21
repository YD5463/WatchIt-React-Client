import http from "./httpService";
import { apiUrl } from "../config.json";

const EndPoint = apiUrl + "/movies";
function movieUrl(id) {
  return `${EndPoint}/${id}`;
}
export function getMovies() {
  return http.get(EndPoint);
}
export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
export async function getMovie(id) {
  return await http.get(movieUrl(id));
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(EndPoint, movie);
}

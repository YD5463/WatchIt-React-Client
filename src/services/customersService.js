import http from "./httpService";
import { apiUrl } from "../config.json";
const EndPoint = apiUrl + "/customers";

export function getCustomers() {
  return http.get(EndPoint);
}
export function addCustomer(customer){
    return http.post(EndPoint,customer);
}
export function updateCustomer(id){

}
export function deleteCustomer(){

}
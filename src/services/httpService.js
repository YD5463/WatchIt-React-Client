import axios from "axios";
import { toast } from "react-toastify";
//import * as Sentry from "@sentry/browser";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectError) {
    toast.error("An unexpexted error accurred");
    //Sentry.captureException(error);
    console.log(error);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
};

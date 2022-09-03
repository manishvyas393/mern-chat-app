import axios from "axios";
const Axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
      credentials: "include"
})
export default Axios
import axios from "axios";

const getEmployee = axios.create({
  baseURL: "http://localhost:8080/api/v1",
})

export default getEmployee;
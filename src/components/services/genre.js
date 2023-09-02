import axios from "../axios";
import { BASE_URL } from "./config";

export function getGenres() {
  return axios.get(`${BASE_URL}/genre`);
}

import axios from "axios";
import { BASE_URL } from "./config";

export async function registerUser(newUser) {
  const { data } = await axios.get(`${BASE_URL}/users?email=${newUser.email}`);
  const existingUser = data.find((user) => user.email === newUser.email);
  if (existingUser) {
    throw new Error("User already exists");
  } else {
    await axios.post(`${BASE_URL}/users`, newUser);
  }
}

import axios from "axios";
import { BASE_URL } from "./config";

export async function loginUser(email, password) {
  //   try {
  const { data } = await axios.get(`${BASE_URL}/users?email=${email}`);
  if (data == 0) {
    throw new Error("User Doesn't Exist");
  }
  if (email !== data[0].email || password !== data[0].password) {
    throw new Error("Please enter correct password");
  }

  return false;
  //   } catch (err) {
  //     console.log("error", err);
  //   }
}

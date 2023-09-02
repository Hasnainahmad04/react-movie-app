import axios from "../axios";
import { BASE_URL } from "./config";

const moviesUrl = `${BASE_URL}/movies`;
const genreUrl = `${BASE_URL}/genre`;

// export function getSingleMovie(id) {
//   return movies.find((m) => m.id === id);
// }

export function Getmovies() {
  return axios.get(moviesUrl);
}
export async function saveMovie(movie) {
  const { data: genre } = await axios.get(`${genreUrl}/${movie.genreId}`);
  delete movie.genreId;
  movie.genre = genre;
  if (movie.id) {
    axios.put(`${moviesUrl}/${movie.id}`, movie);
  } else {
    axios.post(moviesUrl, movie);
  }
}
export async function getSingleMovie(id) {
  return axios.get(`${moviesUrl}/${id}`);
}

export async function deleteMovie(id) {
  return axios.delete(`${moviesUrl}/${id}`);
}

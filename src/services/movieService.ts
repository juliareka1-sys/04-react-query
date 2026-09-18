import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const SRC_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieHTTPResponse {
  results: Movie[];
}

export const fetchMovies = async (request: string): Promise<Movie[]> => {
  const queryParams = {
    params: {
      query: request,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.get<MovieHTTPResponse>(SRC_URL, queryParams);
  return response.data.results;
};

import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const SRC_URL = "https://api.themoviedb.org/3/search/movie";

interface MovieHTTPResponse {
  results: Movie[];
  total_pages: number;
}

interface FetchMoviesResult {
  movies: Movie[];
  totalPages: number;
}

export const fetchMovies = async (
  request: string,
  page: number,
): Promise<FetchMoviesResult> => {
  const queryParams = {
    params: {
      query: request,
      page,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.get<MovieHTTPResponse>(SRC_URL, queryParams);
  return {
    movies: response.data.results,
    totalPages: response.data.total_pages,
  };
};

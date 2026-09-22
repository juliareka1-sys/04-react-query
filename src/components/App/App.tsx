import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;





export default function App() {

    const [request, setRequest] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const movieQuery = useQuery({
    queryKey: ["querytext", request,page],
        queryFn: () => fetchMovies(request, page), 
        enabled: request !== ''
    })

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
       if (movieQuery.data && movieQuery.data.movies.length === 0) {
         toast("No movies found for your request.")   
        }    
    }, [movieQuery.data])
   

    const handleRequest = async (request: string): Promise<void> => {
        setRequest(request)
        setPage(1);
    }

    const handleSelect = (movie:Movie) => {
        setSelectedMovie(movie);
    }

    const handleClose = () => {
        setSelectedMovie(null);
    }
 
    return (
        <>
            <SearchBar onSubmit={handleRequest} />
            {(movieQuery.data?.totalPages ?? 0 ) > 1 && <ReactPaginate
                pageCount={movieQuery.data?.totalPages ?? 0}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"></ReactPaginate>}
            {movieQuery.isLoading && <Loader />}
            {movieQuery.data && movieQuery.data.movies.length > 0 && <MovieGrid movies={movieQuery.data.movies} onSelect={handleSelect} />}
            {movieQuery.isError && <ErrorMessage />}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose} />}
            
            </>

    )
    
}

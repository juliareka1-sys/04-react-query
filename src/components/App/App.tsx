
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    //MODAL
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleRequest = async (request: string): Promise<void> => {
        try {
            setMovies([]);
            setIsLoading(true);
            const requestResult = await fetchMovies(request);
            setMovies(requestResult);
            setError(false);
            if (requestResult.length === 0) {
                toast("No movies found for your request.")
            }
            
        } catch {
            setError(true);   
            
        } finally {
            setIsLoading(false); 
     }
            
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
            {isLoading && <Loader />}
            {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
            {error && <ErrorMessage />}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleClose} />}
            </>

    )
    
}



import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps{
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}


export default function MovieGrid({ movies, onSelect }:MovieGridProps) {
   
    return (
        movies.length > 0 && (
        <ul className={css.grid}>
        {movies.map((movie) => {
        const { id, poster_path, title } = movie;

        return(
        <li key={id}>
        <div className={css.card} onClick={() => onSelect(movie)}>
        <img
        className={css.image}
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        loading="lazy"
        />
        <h2 className={css.title}>{title}</h2>
        </div>
        </li>)
        }) 
        }
        </ul>
            )

    )
    
}


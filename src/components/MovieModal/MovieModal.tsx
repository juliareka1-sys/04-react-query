import css from "./MovieModal.module.css";
import type { Movie } from '../../types/movie';
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    
  const { backdrop_path, title, overview, release_date, vote_average } = movie;
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    }
    
  }, [onClose])
   
   
    return createPortal(
      <div
        className={css.backdrop}
        role="dialog"
        aria-modal="true"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
  <div className={css.modal}>
 <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
      alt={title}
      className={css.image}
    />
    <div className={css.content}>
    <h2>{title}</h2>
    <p>{overview}</p>
      <p>
    <strong>Release Date:</strong>{release_date}
      </p>
      <p>
     <strong>Rating:</strong>{vote_average.toFixed(1)}/10 
      </p>
    </div>
  </div>
</div>, document.body)
}
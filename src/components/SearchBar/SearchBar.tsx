import css from "./SearchBar.module.css";
import toast, { Toaster } from 'react-hot-toast';

interface SearchBarProps {
    onSubmit: (request:string) => Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const processRequest = async (formData: FormData) => {
        const request = formData.get("query") as string; 
        if (request === "") {
            toast.error("Please enter your search query"); 
            return;
        }
      await onSubmit(request);
    }

    return (
 <header className={css.header}>
 <div className={css.container}>
 <a
 className={css.link}
 href="https://www.themoviedb.org/"
 target="_blank"
 rel="noopener noreferrer"
 >
 Powered by TMDB
</a>
 <form action={processRequest} className={css.form}>
 <input
 className={css.input}
 type="text"
 name="query"
 autoComplete="off"
 placeholder="Search movies..."
 autoFocus
 />
<button className={css.button} type="submit">
 Search
 </button>
</form>
<Toaster/>
 </div>
</header>
 )
}
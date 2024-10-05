import { MOVIES } from "@/app/_api/tmdb";
import Loading from "@/app/loading";
import { Media } from "@/app/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DisplayError from "../../skeleton/error";
import SectionComponent from "../../builders/section";
import { getGenreById } from "@/app/_lib/get-genre";

const MoviesSection: React.FC = () => {
  const [movies, setMovies] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const moviesResponse = await MOVIES();
        const movies = moviesResponse.data.results.map((movie: Media) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map((id: number) => getGenreById(id))
            .join(" • "),
          poster_path: movie.poster_path,
        }));
        setMovies(movies);
      } catch (err: unknown) {
        setError("Failed to fetch movies");
        console.log("Failed to fetch movies", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (id: string) => {
    router.push(`/movies/${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <DisplayError error={error} />;

  return (
    <SectionComponent
      title="Movies"
      items={movies}
      onItemClick={handleMovieClick}
    />
  );
};

export default MoviesSection;

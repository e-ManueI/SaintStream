"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JUSTRELEASED } from "../_api/tmdb";
import { useRouter } from "next/navigation";
import MovieCard from "./builders/movie-card";
import MovieCardSkeleton from "./skeleton/movie-card";
import { Movie } from "../utils/types";

const JustReleased: React.FC = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const getGenreById = (id: number): string => {
    const genres: { [key: number]: string } = {
      12: "Adventure",
      14: "Fantasy",
      16: "Animation",
      18: "Drama",
      27: "Horror",
      28: "Action",
      35: "Comedy",
      53: "Thriller",
      80: "Crime",
      878: "Science Fiction",
      10751: "Family",
      10749: "Romance",
      10402: "Music",
      9648: "Mystery",
      37: "Western",
      10770: "TV Movie",
      10752: "War",
    };
    return genres[id] || "Others";
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieResponse = await JUSTRELEASED();
        const transformedMovies = movieResponse.data.results.map(
          (movie: Movie) => ({
            ...movie,
            genres: movie.genre_ids?.map(getGenreById).join(" • "),
          }),
        );
        setMovies(transformedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (id: string | number) => {
    router.push(`/movies/${id}`);
  };

  return (
    <section className="group/chevron relative min-h-[30vh] px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Just Released</h2>
      <div className="relative">
        <div ref={scrollRef} className="flex space-x-8 overflow-x-hidden">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, index) => <MovieCardSkeleton key={index} />)
            : movies.map((movie, index) => (
                <MovieCard
                  key={`${movie.id}-${index}`}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
        </div>

        <button
          onClick={() => handleScroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white opacity-0 transition-opacity hover:bg-opacity-75 group-hover/chevron:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => handleScroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white opacity-0 transition-opacity hover:bg-opacity-75 group-hover/chevron:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default JustReleased;

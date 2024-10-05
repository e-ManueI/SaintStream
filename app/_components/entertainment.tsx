"use client";
import React, { useState, useEffect, useRef } from "react";
import { MOVIES, SERIES, KSERIES } from "../(api)/movie";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import DisplayError from "./skeleton/error";

interface Movie {
  id: string;
  title: string;
  rating: number;
  genre: string;
}
interface Section {
  title: string;
  items: Movie[];
}
const EntertainmentSection = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesResponse, seriesResponse, kseriesResponse] =
          await Promise.all([MOVIES(), SERIES(), KSERIES()]);
        const movies = moviesResponse.data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          genre: movie.genre_ids
            .map((id: number) => getGenreById(id))
            .join(" • "),
          poster_path: movie.poster_path,
        }));
        const series = seriesResponse.data.results.map((serie: any) => ({
          id: serie.id,
          title: serie.name,
          rating: serie.vote_average,
          genre: serie.genre_ids
            .map((id: number) => getGenreById(id))
            .join(" • "),
          poster_path: serie.poster_path,
        }));
        const koreanSeries = kseriesResponse.data.results.map((serie: any) => ({
          id: serie.id,
          title: serie.name,
          rating: serie.vote_average,
          genre: serie.genre_ids
            .map((id: number) => getGenreById(id))
            .join(" • "),
          poster_path: serie.poster_path,
        }));
        setSections([
          { title: "Movies", items: movies },
          { title: "Popular Series", items: series },
          { title: "Korean Series", items: koreanSeries },
        ]);
      } catch (err) {
        console.log("🚀 ~ fetchData ~ err:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
  if (loading) return <Loading />;
  if (error) return <DisplayError error={error} />;
  const handleScroll = (index: number, scrollOffset: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handleMovieClick = (id: string) => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className="px-4 py-8">
      {sections.map((section, index) => (
        <section key={index} className="relative mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          <div className="relative">
            <div
              ref={(el) => {
                if (el) scrollContainerRefs.current[index] = el;
              }}
              className="flex space-x-4 overflow-x-hidden scroll-smooth"
            >
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={() => handleMovieClick(item.id)}
                  className="group w-64 flex-shrink-0"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    width={256}
                    height={144}
                    className="rounded-lg object-cover transition group-hover:scale-105 group-hover:cursor-pointer group-hover:brightness-75"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm">
                        {item.rating} | {item.genre}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleScroll(index, -300)}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleScroll(index, 300)}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default EntertainmentSection;

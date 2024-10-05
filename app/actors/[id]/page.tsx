"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { ACTORSDETAILS, ACTORCREDITS } from "@/app/(api)/movie"; // Import both actor details and credits API
import MovieCard from "@/app/_components/movie-card";
import Loading from "@/app/loading";
import DisplayError from "@/app/_components/skeleton/error";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ActorDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [actor, setActor] = useState<any>(null);
  const [movieCredits, setMovieCredits] = useState<any[]>([]); // To store movie credits
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  // Fetch actor details
  const fetchActorDetails = async (actorId: string) => {
    try {
      const response = await ACTORSDETAILS(actorId);
      setActor(response.data);
    } catch (err) {
      setError("Failed to load actor details.");
    }
  };

  // Fetch actor's movie credits
  const fetchActorCredits = async (actorId: string) => {
    try {
      const response = await ACTORCREDITS(actorId);
      setMovieCredits(response.data.cast); // We are assuming the API returns a "cast" field in the response.
    } catch (err) {
      setError("Failed to load actor's filmography.");
    }
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      Promise.all([fetchActorDetails(params.id), fetchActorCredits(params.id)])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) return <Loading />;
  if (error) return <DisplayError error={error} />;

  return (
    <div className="min-h-screen bg-black pt-16 text-white">
      <main className="px-4 py-12 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Actor Image */}
            <div className="md:w-1/3">
              <Image
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={400}
                height={600}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            {/* Actor Details */}
            <div className="md:w-2/3">
              <h1 className="mb-4 text-4xl font-bold">{actor.name}</h1>
              <h1 className="mb-4 text-gray-400">
                Popularity: {actor.popularity}
              </h1>

              <p className="mb-6 text-gray-400">
                Born: {actor.birthday} • {actor.place_of_birth}
              </p>
              <p className="mb-6 text-gray-300">{actor.biography}</p>

              {/* Filmography */}
              <div className="mb-8 w-full">
                <h2 className="mb-4 text-2xl font-semibold">Filmography</h2>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {movieCredits.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie} // Pass the movie object
                        onClick={() => {
                          // Navigate to the movie details page when the movie card is clicked
                          router.push(`/movies/${movie.id}`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

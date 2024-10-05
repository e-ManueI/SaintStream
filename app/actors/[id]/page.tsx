"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ACTORSDETAILS, ACTORCREDITS } from "@/app/(api)/movie";
import MovieCard from "@/app/_components/movie-card";
import Loading from "@/app/loading";
import DisplayError from "@/app/_components/skeleton/error";
import { Actors, Movie } from "@/app/utils/types";

export default function ActorDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [actor, setActor] = useState<Actors | null>();
  const [movieCredits, setMovieCredits] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch actor details
  const fetchActorDetails = async (actorId: string) => {
    try {
      const response = await ACTORSDETAILS(actorId);
      setActor(response.data);
    } catch (err: unknown) {
      setError(`Failed to load actor's filmography: ${err}`);
    }
  };

  // Fetch actor's movie credits
  const fetchActorCredits = async (actorId: string) => {
    try {
      const response = await ACTORCREDITS(actorId);
      setMovieCredits(response.data.cast);
    } catch (err: unknown) {
      setError(`Failed to load actor's filmography: ${err}`);
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
        <div className="mx-auto max-w-7xl">
          {actor && movieCredits.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-3">
              {/* Actor Image */}
              <div className="top-20 h-min max-h-full w-[100%] grow-0 overflow-hidden md:sticky md:col-span-1">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    width={400}
                    height={600}
                    className="rounded-lg object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-[600px] w-[400px] items-center justify-center rounded-lg bg-gray-800 text-center text-gray-500 shadow-lg hover:bg-gray-900">
                    <span className="text-xl">{actor.name}</span>
                  </div>
                )}
              </div>
              {/* Actor Details */}
              <div className="grow-1 flex flex-col gap-y-6 md:col-span-2">
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
                          movie={movie}
                          onClick={() => {
                            router.push(`/movies/${movie.id}`);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

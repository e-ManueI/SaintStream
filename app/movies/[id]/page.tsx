"use client";
import TransitionalLink from "@/app/utils/transition-link";
import { Download, Share, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MOVIESDETAILS, MOVIECREDITS } from "../../(api)/movie";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { Actors, Content, Episodes } from "@/app/utils/types";

export default function ContentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [content, setContent] = useState<Content | null>(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const details = await MOVIESDETAILS(params.id);
        console.log("🚀 ~ getContentDetails ~ details:", details);
        setContent(details.data ? details.data : details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchActors = async () => {
      try {
        const actorResponse = await MOVIECREDITS(params.id);
        console.log("cast results", actorResponse.data.cast);
        setActors(actorResponse.data.cast);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };

    fetchActors();
    getContentDetails();
  }, [params.id]);

  if (!content) return <Loading />;
  // Function to handle actor click and navigate to the actor's page
  const handleActorClick = (id: string, name: string, image: string) => {
    // Navigate dynamically to the actor's page
    router.push(
      `/actors/${id}?name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`,
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <div className="relative h-[50vh] bg-gray-800">
          <Image
            src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
            alt={content.title}
            objectFit="cover"
            fill
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
            <div className="container mx-auto px-4 pb-8 md:px-0">
              {content.title && (
                <h2 className="mb-2 text-4xl font-bold">{content.title}</h2>
              )}
              {content.release_date && (
                <p className="mb-4 text-lg">
                  {content.status === "Released" &&
                    `${content.runtime} minutes • `}
                  {new Date(content.release_date).getFullYear()} •
                  {content.genres && content.genres.length > 0
                    ? content.genres
                        .map((genre: { name: string }) => genre.name)
                        .join(" • ")
                    : "N/A"}
                </p>
              )}
              <div className="space-y-4">
                <div className="space-x-4">
                  <button className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                    Watch Now
                  </button>
                  <button className="rounded-md border border-white px-6 py-2 hover:bg-white hover:text-black">
                    Add Watchlist
                  </button>
                </div>
                <div className="space-x-4">
                  <button className="rounded-full border border-white p-2 hover:bg-white hover:text-black">
                    <Download className="h-6 w-6" />
                  </button>
                  <button className="rounded-full border border-white p-2 hover:bg-white hover:text-black">
                    <Share className="h-6 w-6" />
                  </button>
                  <button className="rounded-full border border-white p-2 hover:bg-white hover:text-black">
                    <ThumbsUp className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:px-0">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Story Line</h2>
            <p className="mb-2 text-gray-300">
              {content.overview || "No overview available."}
            </p>
            <button className="text-green-500 hover:underline">More</button>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Top Cast</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
              {actors.map((actor: Actors) => (
                <TransitionalLink
                  href={`/actors/${actor.id}?name=${encodeURIComponent(actor.name)}&image=${encodeURIComponent(actor.profile_path)}`}
                  key={actor.id}
                  onClick={() =>
                    handleActorClick(actor.id, actor.name, actor.profile_path)
                  }
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="flex h-32 w-32 items-center justify-center space-y-2 overflow-hidden rounded-full bg-gray-800 bg-center hover:bg-gray-900">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        width={200}
                        height={200}
                        className="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <span className="text-center text-sm text-gray-500">
                        {actor.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-center text-sm font-semibold">
                      {actor.name}
                    </p>
                    <p className="text-center text-xs text-gray-400">
                      {actor.character}
                    </p>
                  </div>
                </TransitionalLink>
              ))}
            </div>
          </section>

          {content.episodes && (
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Episodes</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {content.episodes.map((episode: Episodes) => (
                  <div
                    key={episode.id}
                    className="overflow-hidden rounded-lg bg-gray-900"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                      alt={episode.title}
                      width={300}
                      height={150}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="mb-2 font-semibold">{episode.title}</h4>
                      <p className="mb-2 text-sm text-gray-400">
                        {episode.overview}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{episode.air_date}</span>
                        <span>{episode.runtime} min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

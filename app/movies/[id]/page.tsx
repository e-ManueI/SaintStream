"use client";
import TransitionalLink from "@/app/utils/transition-link";
import { Star, Download, Share, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MOVIESDETAILS, MOVIECREDITS } from "../../(api)/movie";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function ContentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [content, setContent] = useState<any>(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchActors = async () => {
    try {
      const actorResponse = await MOVIECREDITS(params.id);
      console.log("cast results", actorResponse.data.cast);
      setActors(actorResponse.data.cast);
      // setActors(actorResponse.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching actors:", error);
    }
  };

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const details = await MOVIESDETAILS(params.id);
        console.log("🚀 ~ getContentDetails ~ details:", details);
        setContent(details.data ? details.data : details); // Adjust based on API response structure
      } catch (error) {
        console.error("Error fetching movie details:", error);
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
              {actors.map((actor) => (
                <TransitionalLink
                  href={`/actors/${actor.id}?name=${encodeURIComponent(actor.name)}&image=${encodeURIComponent(actor.profile_path)}`}
                  key={actor.id}
                  onClick={() =>
                    handleActorClick(actor.id, actor.name, actor.profile_path)
                  }
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="h-32 w-32 space-y-2 overflow-hidden rounded-full bg-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      width={200}
                      height={200}
                      className="w-full rounded-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <p className="text-center text-sm font-semibold">
                    {actor.name}
                  </p>
                  <p className="text-center text-xs text-gray-400">
                    {actor.character}
                  </p>
                </TransitionalLink>
              ))}
            </div>
          </section>

          {content.episodes && (
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Episodes</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {content.episodes.map((episode) => (
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

          {/* <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">Similar Movies for you</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {content.similarContent &&
                content.similarContent.map((item) => (
                  <TransitionalLink
                    href={`/movies/${item.id}`}
                    key={item.id}
                    className="group"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Star className="mr-1 h-4 w-4 text-yellow-400" />
                        <span>{item.vote_average}</span>
                        <span className="mx-1">•</span>
                        <span>{item.release_date.split("-")[0]}</span>
                      </div>
                    </div>
                  </TransitionalLink>
                ))}
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}

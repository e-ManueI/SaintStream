import TransitionalLink from "@/app/utils/transition-link";
import { Star, Download, Share, ThumbsUp } from "lucide-react";
import Image from "next/image";

async function getContentDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const isMovie = parseInt(id) <= 8;
  return {
    id,
    title: isMovie ? `Movie ${id}` : `The Last of Us`,
    type: isMovie ? "movie" : "series",
    year: 2023,
    genres: ["Drama", "Action", "Adventure"],
    description:
      "The Last of Us is an American post-apocalyptic drama television series created by Craig Mazin and Neil Druckmann for HBO. Based on the 2013 video game developed by Naughty Dog, the series is set in 2023, twenty years into a pandemic caused by a mass fungal infection, which causes its hosts to transform into zombie-like creatures and collapses society. The series follows Joel (Pedro Pascal), a smuggler tasked with escorting the immune teenager Ellie (Bella Ramsey) across a post-apocalyptic United States....",
    cast: [
      {
        id: "1",
        name: "Pedro Pascal",
        character: "Joel Miller",
        image: "/profile.png",
      },
      {
        id: "2",
        name: "Bella Ramsey",
        character: "Ellie",
        image: "/profile.png",
      },
      { id: "3", name: "Anna Torv", character: "Tessa", image: "/profile.png" },
      {
        id: "4",
        name: "Ashley Johnson",
        character: "Ellie Mother",
        image: "/profile.png",
      },
      {
        id: "5",
        name: "Nick Offerman",
        character: "Bill",
        image: "/profile.png",
      },
    ],
    episodes: [
      {
        number: 1,
        title: "Chapter 1",
        description:
          "The chapter about guineapigs just want to go out fromhis palace to get freedom...",
        duration: "00:57:45",
        thumbnail: "/episode1.jpg",
      },
      {
        number: 2,
        title: "Chapter 2",
        description:
          "The chapter about guineapigs just want to go out fromhis palace to get freedom...",
        duration: "00:57:45",
        thumbnail: "/episode2.jpg",
      },
      {
        number: 3,
        title: "Chapter 3",
        description:
          "The chapter about guineapigs just want to go out fromhis palace to get freedom...",
        duration: "00:57:45",
        thumbnail: "/episode3.jpg",
      },
      {
        number: 4,
        title: "Chapter 4",
        description:
          "The chapter about guineapigs just want to go out fromhis palace to get freedom...",
        duration: "00:57:45",
        thumbnail: "/episode4.jpg",
      },
    ],
    similarContent: [
      {
        id: "1",
        title: "TOP GUN: Maverick",
        year: 2022,
        genre: "Action",
        type: "Movie",
        rating: 4.6,
        image: "/movie1.jpg",
      },
      {
        id: "2",
        title: "Spiderman: Into the Spider Verse",
        year: 2023,
        genre: "Action",
        type: "Movie",
        rating: 4.6,
        image: "/movie2.jpg",
      },
      {
        id: "3",
        title: "Black Panther: Wakanda Forever",
        year: 2022,
        genre: "Action",
        type: "Movie",
        rating: 4.6,
        image: "/movie3.jpg",
      },
      {
        id: "4",
        title: "Batman V Superman",
        year: 2016,
        genre: "Action",
        type: "Movie",
        rating: 4.6,
        image: "/movie4.jpg",
      },
    ],
  };
}

export default async function ContentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const content = await getContentDetails(params.id);

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <div className="relative h-[50vh] bg-gray-800">
          <Image
            src={`/movie${content.id}.jpeg`}
            alt={content.title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
            <div className="container mx-auto pb-8">
              <h2 className="mb-2 text-4xl font-bold">{content.title}</h2>
              <p className="mb-4 text-lg">
                {content.type === "series" &&
                  `${content.episodes?.length} Episodes • `}
                {content.year} • {content.genres.join(" • ")}
              </p>
              <div className="flex space-x-4">
                <button className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                  {content.type === "movie" ? "Watch Now" : "Continue Watching"}
                </button>
                <button className="rounded-md border border-white px-6 py-2 hover:bg-white hover:text-black">
                  Add Watchlist
                </button>
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

        <div className="container mx-auto py-8">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Story Line</h2>
            <p className="mb-2 text-gray-300">{content.description}</p>
            <button className="text-green-500 hover:underline">More</button>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Top Cast</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {content.cast.map((actor) => (
                <TransitionalLink
                  href={`/actors/${actor.id}?name=${encodeURIComponent(actor.name)}&image=${encodeURIComponent(actor.image)}`}
                  key={actor.id}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={actor.image}
                    alt={actor.name}
                    width={80}
                    height={80}
                    className="mb-2 rounded-full"
                  />
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

          {content.type === "series" && (
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">1-9 Episode</h2>
                <select
                  className="rounded-lg bg-gray-800 px-4 py-2 text-white"
                  aria-label="Select season"
                >
                  <option>Season 1</option>
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {content.episodes.map((episode) => (
                  <div
                    key={episode.number}
                    className="overflow-hidden rounded-lg bg-gray-900"
                  >
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title}
                      width={300}
                      height={150}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h4 className="mb-2 font-semibold">{episode.title}</h4>
                      <p className="mb-2 text-sm text-gray-400">
                        {episode.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>34:05</span>
                        <span>{episode.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold">Similar Movies for you</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {content.similarContent.map((item) => (
                <TransitionalLink
                  href={`/movies/${item.id}`}
                  key={item.id}
                  className="group"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
                    <Image
                      src={item.image}
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
                      <span>{item.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{item.genre}</span>
                      <span className="mx-1">•</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </TransitionalLink>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

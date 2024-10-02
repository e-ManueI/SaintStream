import Image from "next/image";
import Link from "next/link";

async function getActorDetails(id: string, name: string, image: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id,
    name,
    image,
    birthDate: "January 1, 1980",
    birthPlace: "Los Angeles, USA",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    filmography: [
      {
        id: "1",
        title: "Movie Title 1",
        year: 2023,
        image: "/movie1.jpeg?height=300&width=200",
      },
      {
        id: "2",
        title: "Movie Title 2",
        year: 2022,
        image: "/movie2.jpeg?height=300&width=200",
      },
      {
        id: "3",
        title: "Movie Title 3",
        year: 2021,
        image: "/movie3.jpeg?height=300&width=200",
      },
      {
        id: "4",
        title: "Movie Title 4",
        year: 2020,
        image: "/movie4.jpeg?height=300&width=200",
      },
    ],
  };
}

export default async function ActorDetail({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { name: string; image: string };
}) {
  const actor = await getActorDetails(
    params.id,
    searchParams.name,
    searchParams.image,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="px-4 py-12 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/3">
              <Image
                src={actor.image}
                alt={actor.name}
                width={400}
                height={600}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h1 className="mb-4 text-4xl font-bold">{actor.name}</h1>
              <p className="mb-6 text-gray-400">
                Born: {actor.birthDate} • {actor.birthPlace}
              </p>
              <p className="mb-6 text-gray-300">{actor.biography}</p>
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Filmography</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {actor.filmography.map((movie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      key={movie.id}
                      className="group"
                    >
                      <div className="relative mb-2 aspect-[2/3]">
                        <Image
                          src={movie.image}
                          alt={movie.title}
                          fill
                          className="rounded-lg object-cover transition duration-300 group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="text-sm font-semibold">{movie.title}</h3>
                      <p className="text-xs text-gray-400">{movie.year}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

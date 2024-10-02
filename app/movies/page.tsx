import Image from "next/image";
import TransitionalLink from "../utils/transition-link";

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="p-8 pt-24">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Popular Titles</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search titles..."
              className="rounded-lg bg-gray-800 text-white"
            />
            <select
              className="w-full rounded-lg bg-gray-800 text-white"
              aria-label="Select movie genre"
            >
              <option value="">Genre</option>
              <option value="action">Action</option>
              <option value="drama">Drama</option>
              <option value="comedy">Comedy</option>
            </select>
            <select
              className="w-full rounded-lg bg-gray-800 text-white"
              aria-label="Select year"
            >
              <option value="">Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Movies</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <MovieCard
                key={i}
                id={i.toString()}
                title={`Movie ${i}`}
                year={2023}
                genres={["Action", "Drama"]}
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-2xl font-semibold">Series</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <MovieCard
                key={i}
                id={i.toString()}
                title={`Series ${i - 8}`}
                year={2023}
                genres={["Comedy", "Thriller"]}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function MovieCard({
  id,
  title,
  year,
  genres,
}: {
  id: string;
  title: string;
  year: number;
  genres: string[];
}) {
  return (
    <TransitionalLink href={`/movies/${id}`} className="group">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
        <Image
          src={`/movie${id}.jpeg`}
          alt={title}
          width={300}
          height={200}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300">
            {year} • {genres.join(", ")}
          </p>
        </div>
      </div>
    </TransitionalLink>
  );
}

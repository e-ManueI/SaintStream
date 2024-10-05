import Image from "next/image";
import { Movie } from "../../utils/types";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number | string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="w-50 group relative h-80 flex-shrink-0 cursor-pointer overflow-hidden"
    >
      <div className="h-full w-full">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={120}
            quality={100}
            className="h-full w-full overflow-hidden rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-900">
            <span className="px-4 text-center text-sm text-white">
              {movie.title}
            </span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <div className="flex items-center">
          <span className="mr-1 text-yellow-400">★</span>
          <span>{movie.vote_average}</span>
        </div>
        <p className="text-sm text-gray-300">{movie.genres}</p>
      </div>
    </div>
  );
};

export default MovieCard;

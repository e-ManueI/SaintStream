import Image from "next/image";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    genres: string;
  };
  onClick: (id: number | string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="group relative h-96 w-60 flex-shrink-0 cursor-pointer overflow-hidden"
    >
      <div className="h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={240}
          height={360}
          quality={100}
          className="h-full w-full overflow-hidden rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
        />
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

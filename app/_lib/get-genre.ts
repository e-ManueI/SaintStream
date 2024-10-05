export const getGenreById = (id: number): string => {
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

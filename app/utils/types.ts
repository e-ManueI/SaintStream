export interface Actors {
  name: string;
  id: string;
  image: string;
  character: string;
  profile_path: string;
  popularity?: number;
  place_of_birth?: string;
  birthday?: string;
  biography?: string;
}

export interface Episodes {
  id: string;
  still_path: string;
  title: string;
  air_date: string;
  runtime: string;
  overview: string;
}

export interface Movie {
  id: string;
  title: string;
  rating: number;
  genre: string;
  poster_path: string;
  vote_average?: string;
  genres?: string;
  genre_ids?: number[];
}

export interface Section {
  title: string;
  items: Movie[];
}

// Generic Media interface to represent movies, series, and Korean series
export interface Media {
  id: number;
  genre: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  title?: string;
  name?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Content {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  status: string;
  runtime: number;
  genres?: Genre[];
  episodes?: Episodes[];
}

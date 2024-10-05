import axios from "axios";
import { BASEURL } from "./apiconfig";
const baseURL = BASEURL;
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const JUSTRELEASED = () => {
  return api({
    url: `/movie/upcoming?api_key=${apiKey}&language=en-US`,
    method: "GET",
  });
};
export const MOVIES = () => {
  return api({
    url: `/movie/popular?api_key=${apiKey}`,
    method: "GET",
  });
};
export const MOVIESDETAILS = (id: string) => {
  return api({
    url: `/movie/${id}?api_key=${apiKey}&language=en-US`,
    method: "GET",
  });
};

export const MOVIECREDITS = (movie_id: string) => {
  return api({
    url: `/movie/${movie_id}/credits?api_key=${apiKey}`,
    method: "GET",
  });
};

export const SERIES = () => {
  return api({
    url: `/tv/popular?api_key=${apiKey}&language=en-US`,
    method: "GET",
  });
};

export const SERIESDETAILS = (series_id: string) => {
  return api({
    url: `/tv/${series_id}?api_key=${apiKey}&language=en-US`,
  });
};

export const KSERIES = () => {
  return api({
    url: `/discover/tv?api_key=${apiKey}&language=en-US&with_original_language=ko`,
    method: "GET",
  });
};
export const ACTORS = () => {
  return api({
    url: `/person/popular?api_key=${apiKey}`,
    method: "GET",
  });
};
export const ACTORSDETAILS = (id: string) => {
  return api({
    url: `/person/${id}?api_key=${apiKey}`,
    method: "GET",
  });
};

export const ACTORCREDITS = (id: string) => {
  return api({
    url: `/person/${id}/movie_credits?api_key=${apiKey}`,
    method: "GET",
  });
};

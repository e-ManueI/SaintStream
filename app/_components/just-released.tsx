"use client";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Movie {
  title: string;
  rating: number;
  genre: string;
  image: string;
}

const JustReleased: React.FC = () => {
  const movies: Movie[] = [
    {
      title: "Enola Holmes 2",
      rating: 4.8,
      genre: "Action • Movie",
      image: "/movie1.jpeg",
    },
    {
      title: "Satan's Slaves",
      rating: 4.4,
      genre: "Horror • Movie",
      image: "/movie2.jpeg",
    },
    {
      title: "The Flash",
      rating: 4.6,
      genre: "Mystery • Movie",
      image: "/movie3.jpeg",
    },
    {
      title: "Weak Hero",
      rating: 4.6,
      genre: "Action • Drama",
      image: "/movie4.jpeg",
    },
    {
      title: "Wonder Woman",
      rating: 4.4,
      genre: "Action • Movie",
      image: "/movie5.jpeg",
    },
  ];

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="group/chevron relative px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Just Released</h2>
      <div className="relative">
        <div ref={scrollRef} className="flex space-x-8 overflow-x-hidden">
          {movies.map((movie, index) => (
            <div
              key={`${movie.title}-${index}`}
              className="group relative h-96 w-60 flex-shrink-0" // fixed height (h-96) and width (w-60)
            >
              <div className="h-full w-full">
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={240}
                  height={360}
                  quality={100}
                  className="h-full w-full rounded-lg object-cover" // Ensure uniform size
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <div className="flex items-center">
                  <span className="mr-1 text-yellow-400">★</span>
                  <span>{movie.rating}</span>
                </div>
                <p className="text-sm text-gray-300">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Scroll Button */}
        <button
          onClick={() => handleScroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white opacity-0 transition-opacity hover:bg-opacity-75 group-hover/chevron:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white opacity-0 transition-opacity hover:bg-opacity-75 group-hover/chevron:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default JustReleased;

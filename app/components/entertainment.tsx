"use client";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import Image from "next/image"; // Ensure to import Image component
import { useRef } from "react";

const EntertainmentSection = () => {
  const sections = [
    {
      title: "Movies",
      items: [
        {
          title: "Antman & The Wasp Quantumania",
          rating: 4.6,
          genre: "Action • Movie",
        },
        {
          title: "Air: Courting A Legend",
          rating: 4.6,
          genre: "Action • Movie",
        },
        { title: "John Wick: Chapter 4", rating: 4.9, genre: "Action • Movie" },
        { title: "Mechamato Movie", rating: 4.6, genre: "Action • Movie" },
        { title: "Super Mario Bros", rating: 4.6, genre: "Action • Movie" },
        {
          title: "Antman & The Wasp Quantumania",
          rating: 4.6,
          genre: "Action • Movie",
        },
        {
          title: "Air: Courting A Legend",
          rating: 4.6,
          genre: "Action • Movie",
        },
        { title: "John Wick: Chapter 4", rating: 4.9, genre: "Action • Movie" },
        { title: "Mechamato Movie", rating: 4.6, genre: "Action • Movie" },
        { title: "Super Mario Bros", rating: 4.6, genre: "Action • Movie" },
      ],
    },
    {
      title: "Series",
      items: [
        { title: "Wednesday Season 1", rating: 4.6, genre: "Action • Movie" },
        { title: "Beef Series", rating: 4.6, genre: "Action • Movie" },
        {
          title: "Valhalla Murders Series",
          rating: 4.6,
          genre: "Action • Movie",
        },
        { title: "The Witcher Volume 2", rating: 4.6, genre: "Action • Movie" },
        { title: "The Foreigner", rating: 4.6, genre: "Action • Movie" },
        { title: "Wednesday Season 1", rating: 4.6, genre: "Action • Movie" },
        { title: "Beef Series", rating: 4.6, genre: "Action • Movie" },
        {
          title: "Valhalla Murders Series",
          rating: 4.6,
          genre: "Action • Movie",
        },
        { title: "The Witcher Volume 2", rating: 4.6, genre: "Action • Movie" },
        { title: "The Foreigner", rating: 4.6, genre: "Action • Movie" },
      ],
    },
    {
      title: "Korean Series",
      items: [
        { title: "Toxic", rating: 4.6, genre: "Action • Movie" },
        { title: "Insider", rating: 4.6, genre: "Action • Movie" },
        { title: "Race Season 1", rating: 4.6, genre: "Action • Movie" },
        { title: "Ghost Doctor", rating: 4.6, genre: "Action • Movie" },
        {
          title: "The Pirates: The Last Royal Treasure",
          rating: 4.6,
          genre: "Action • Movie",
        },
        { title: "Toxic", rating: 4.6, genre: "Action • Movie" },
        { title: "Insider", rating: 4.6, genre: "Action • Movie" },
        { title: "Race Season 1", rating: 4.6, genre: "Action • Movie" },
        { title: "Ghost Doctor", rating: 4.6, genre: "Action • Movie" },
        {
          title: "The Pirates: The Last Royal Treasure",
          rating: 4.6,
          genre: "Action • Movie",
        },
      ],
    },
  ];

  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (index: number, scrollOffset: number) => {
    if (scrollContainerRefs.current[index]) {
      scrollContainerRefs.current[index]?.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-4 py-8">
      {sections.map((section, index) => (
        <section key={index} className="relative mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          <div className="relative">
            <div
              ref={(el) => {
                if (el) scrollContainerRefs.current[index] = el;
              }}
              className="flex space-x-4 overflow-x-hidden scroll-smooth"
            >
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="w-64 flex-shrink-0">
                  <Image
                    src="/movie-series.jpeg"
                    alt={item.title}
                    width={256}
                    height={144}
                    className="rounded-lg object-cover"
                  />
                  <div className="mt-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 text-sm">
                        {item.rating} | {item.genre}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleScroll(index, -300)}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleScroll(index, 300)}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default EntertainmentSection;

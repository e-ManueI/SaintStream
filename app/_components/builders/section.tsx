import React, { useRef } from "react";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { Media } from "../../utils/types";

interface SectionComponentProps {
  title: string;
  items: Media[];
  onItemClick: (id: string) => void;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  items,
  onItemClick,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative mb-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth"
        >
          {items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              onClick={() => onItemClick(item.id.toString())}
              className="group w-64 flex-shrink-0"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title ?? "image"}
                width={256}
                height={144}
                className="rounded-lg object-cover transition group-hover:scale-105 group-hover:cursor-pointer group-hover:brightness-75"
              />
              <div className="mt-2">
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="ml-1 text-sm">{item.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleScroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => handleScroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white transition-opacity hover:bg-opacity-75"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default SectionComponent;

"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import ParallaxLogos from "./parallax";

const StreamingServices: React.FC = () => {
  const logos = [
    { name: "Disney", src: "/streams/disney.png" },
    { name: "Netflix", src: "/streams/netflix.png" },
    { name: "HBO Max", src: "/streams/hbomax.png" },
    { name: "Pixar", src: "/streams/pixar.png" },
    { name: "Marvel", src: "/streams/marvel.svg" },
    { name: "National Geographic", src: "/streams/natgeo.jpg" },
    { name: "Star Wars", src: "/streams/starwars.png" },
    { name: "Disney", src: "/streams/disney.png" },
    { name: "Netflix", src: "/streams/netflix.png" },
    { name: "HBO Max", src: "/streams/hbomax.png" },
    { name: "Pixar", src: "/streams/pixar.png" },
    { name: "Marvel", src: "/streams/marvel.svg" },
    { name: "National Geographic", src: "/streams/natgeo.jpg" },
    { name: "Star Wars", src: "/streams/starwars.png" },
  ];

  return (
    <section className="py-8 overflow-hidden ">
      <div className="flex justify-center">
        <div className="relative w-full">
          <div className="flex whitespace-nowrap">
            <ParallaxLogos logos={logos} baseVelocity={5} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreamingServices;

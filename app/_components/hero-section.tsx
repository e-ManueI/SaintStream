import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <Image
        src="/movie.webp?height=500&width=1200"
        alt="Star Wars: The Force Awakens"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0">
        <div className="absolute z-50 flex h-full w-full flex-col justify-end px-8 pb-16">
          <h1 className="mb-2 text-4xl font-bold">
            Star Wars: The Force Awakens
          </h1>
          <p className="mb-4 text-sm text-gray-300">
            2h40m • 2023 • Fantasy • Action
          </p>
          <p className="mb-4 max-w-2xl text-sm text-gray-300">
            The third season of the American television series The Mandalorian
            stars Pedro Pascal as the title character, a bounty hunter traveling
            to Mandalore to redeem his past transgressions with his adopted son
            Grogu and being aided on their journey by fellow Mandalorian
            Bo-Katan Kryze.
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center rounded-md bg-green-500 px-6 py-2 text-black hover:bg-green-600">
              <span className="mr-2">▶</span> Watch Trailer
            </button>
            <button className="flex items-center rounded-md bg-gray-800 px-6 py-2 text-white hover:bg-gray-700">
              <span className="mr-2">+</span> Add Watchlist
            </button>
          </div>
        </div>
        {/* bottom overlay */}
        <div className="absolute bottom-0 right-0 z-10 h-full w-full bg-gradient-to-t from-gray-600/[0.5] to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;

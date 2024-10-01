import Image from "next/image"; // Assuming you are using Next.js

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
        <div className="absolute flex flex-col justify-end px-8 pb-16 h-full w-full z-50">
          <h1 className="text-4xl font-bold mb-2">
            Star Wars: The Force Awakens
          </h1>
          <p className="text-sm text-gray-300 mb-4">
            2h40m • 2023 • Fantasy • Action
          </p>
          <p className="text-sm text-gray-300 mb-4 max-w-2xl">
            The third season of the American television series The Mandalorian
            stars Pedro Pascal as the title character, a bounty hunter traveling
            to Mandalore to redeem his past transgressions with his adopted son
            Grogu and being aided on their journey by fellow Mandalorian
            Bo-Katan Kryze.
          </p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 flex items-center">
              <span className="mr-2">▶</span> Watch Trailer
            </button>
            <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center">
              <span className="mr-2">+</span> Add Watchlist
            </button>
          </div>
        </div>
        {/* bottom overlay */}
        <div className="w-full absolute h-full bottom-0 right-0 bg-gradient-to-t from-gray-600/[0.5] to-transparent z-10" />
      </div>
    </section>
  );
};

export default HeroSection;

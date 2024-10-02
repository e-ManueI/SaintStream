import EntertainmentSection from "./_components/entertainment";
import HeroSection from "./_components/hero-section";
import JustReleased from "./_components/just-released";
import StreamingServices from "./_components/streaming-services";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <StreamingServices />
      <JustReleased />
      <EntertainmentSection />
    </div>
  );
}

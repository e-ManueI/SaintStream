import EntertainmentSection from "./components/entertainment";
import HeroSection from "./components/hero-section";
import JustReleased from "./components/just-released";
import StreamingServices from "./components/streaming-services";

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

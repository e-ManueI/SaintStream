import HeroSection from "./components/hero-section";
import StreamingServices from "./components/streaming-services";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <StreamingServices />
    </div>
  );
}

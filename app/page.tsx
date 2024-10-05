import { Metadata } from "next";
import EntertainmentSection from "./_components/entertainment/entertainment";
import HeroSection from "./_components/hero-section";
import JustReleased from "./_components/just-released";
import StreamingServices from "./_components/streaming-services";
import { siteConfig } from "./_config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Home`,
  description: `${siteConfig.description}`,
};
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

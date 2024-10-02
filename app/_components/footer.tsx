import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "../config/site";
import TransitionalLink from "../utils/transition-link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black px-4 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between md:flex-row">
        <div className="mb-6 md:mb-0">
          <h3 className="mb-2 text-3xl font-bold">
            Our platform is trusted
            <br />
            by millions & features
            <br />
            best updated movies
            <br />
            all around the world.
          </h3>
        </div>
        <nav className="mb-6 flex space-x-4 text-sm md:mb-0">
          <TransitionalLink href="/" className="text-gray-400 hover:text-white">
            Home
          </TransitionalLink>
          <span className="text-gray-400">/</span>
          <TransitionalLink
            href="/discover"
            className="text-gray-400 hover:text-white"
          >
            Discover
          </TransitionalLink>
          <span className="text-gray-400">/</span>
          <TransitionalLink
            href="/influence"
            className="text-gray-400 hover:text-white"
          >
            Influence
          </TransitionalLink>
          <span className="text-gray-400">/</span>
          <TransitionalLink
            href="/release"
            className="text-gray-400 hover:text-white"
          >
            Release
          </TransitionalLink>
        </nav>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between md:flex-row">
        <div className="mb-4 flex space-x-4 text-xs text-gray-400 md:mb-0">
          <TransitionalLink href="/privacy" className="hover:text-white">
            Privacy policy
          </TransitionalLink>
          <TransitionalLink href="/terms" className="hover:text-white">
            Term of service
          </TransitionalLink>
          <TransitionalLink href="/language" className="hover:text-white">
            Language
          </TransitionalLink>
        </div>
        <div className="flex space-x-4">
          <TransitionalLink
            href={siteConfig.links.instagram}
            className="text-white hover:text-gray-300"
          >
            <Instagram className="h-6 w-6" />
          </TransitionalLink>
          <TransitionalLink
            href={siteConfig.links.facebook}
            className="text-white hover:text-gray-300"
          >
            <Facebook className="h-6 w-6" />
          </TransitionalLink>
          <TransitionalLink
            href={siteConfig.links.twitter}
            className="text-white hover:text-gray-300"
          >
            <Twitter className="h-6 w-6" />
          </TransitionalLink>
          <TransitionalLink
            href={siteConfig.links.linkedin}
            className="text-white hover:text-gray-300"
          >
            <Linkedin className="h-6 w-6" />
          </TransitionalLink>
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-7xl text-right text-xs text-gray-400">
        © 2024.
      </div>
    </footer>
  );
};

export default Footer;

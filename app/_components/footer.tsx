import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "../config/site";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="mb-6 md:mb-0">
          <h3 className="text-3xl font-bold mb-2">
            Our platform is trusted
            <br />
            by millions & features
            <br />
            best updated movies
            <br />
            all around the world.
          </h3>
        </div>
        <nav className="flex space-x-4 text-sm mb-6 md:mb-0">
          <Link href="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/discover" className="text-gray-400 hover:text-white">
            Discover
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/influence" className="text-gray-400 hover:text-white">
            Influence
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/release" className="text-gray-400 hover:text-white">
            Release
          </Link>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8">
        <div className="flex space-x-4 text-xs text-gray-400 mb-4 md:mb-0">
          <Link href="/privacy" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Term of service
          </Link>
          <Link href="/language" className="hover:text-white">
            Language
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href={siteConfig.links.instagram}
            className="text-white hover:text-gray-300"
          >
            <Instagram className="w-6 h-6" />
          </Link>
          <Link
            href={siteConfig.links.facebook}
            className="text-white hover:text-gray-300"
          >
            <Facebook className="w-6 h-6" />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            className="text-white hover:text-gray-300"
          >
            <Twitter className="w-6 h-6" />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="text-white hover:text-gray-300"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-right mt-4 text-gray-400 text-xs">
        © 2024.
      </div>
    </footer>
  );
};

export default Footer;

"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface Logo {
  name: string;
  src: string;
}

function ParallaxLogos({
  logos,
  baseVelocity = 100,
}: {
  logos: Logo[]; // Changed from Logo to Logo[]
  baseVelocity: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 600,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => {
    const rangeStart = -20;
    const rangeEnd = -45;
    const percentage =
      ((((v - rangeStart) % (rangeEnd - rangeStart)) +
        (rangeEnd - rangeStart)) %
        (rangeEnd - rangeStart)) +
      rangeStart;
    return `${percentage}%`;
  });

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 6000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get() * 0.05;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap leading-loose tracking-tight">
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {logos.map((logo: Logo, index: number) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex h-20 w-32 flex-shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={50}
              className="object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
        {logos.map((logo: Logo, index: number) => (
          <div
            key={`${logo.name}-${index}-duplicate`}
            className="flex h-20 w-32 flex-shrink-0 items-center justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={50}
              className="object-contain opacity-70 transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ParallaxLogos;

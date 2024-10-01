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

function ParallaxLogos({ logos, baseVelocity = 100 }) {
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
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center w-32 h-20 flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={50}
              className="opacity-70 hover:opacity-100 transition-opacity object-contain"
            />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}-duplicate`}
            className="flex items-center justify-center w-32 h-20 flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={100}
              height={50}
              className="opacity-70 hover:opacity-100 transition-opacity object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default ParallaxLogos;

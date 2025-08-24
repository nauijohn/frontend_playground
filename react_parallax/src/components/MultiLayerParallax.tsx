import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MultiLayerParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div
      ref={ref}
      className="relative place-items-center grid w-full h-screen overflow-hidden"
    >
      <motion.h1
        style={{ y: textY }}
        className="z-10 relative font-bold text-white text-7xl md:text-9xl"
      >
        PARALLAX
      </motion.h1>

      <motion.div
        className="z-0 absolute inset-0"
        style={{
          backgroundImage: `url(/image.png)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          y: backgroundY,
        }}
      />

      <div
        className="z-20 absolute inset-0"
        style={{
          backgroundImage: `url(/image-sub.png)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      />
    </div>
  );
};

export default MultiLayerParallax;

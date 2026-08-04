import { useEffect, useRef } from 'react';

export const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rainbowRef = useRef<HTMLImageElement>(null);
  const leftCloudRef = useRef<HTMLImageElement>(null);
  const rightCloudRef = useRef<HTMLImageElement>(null);

  // Smooth lerp state stored in refs to avoid React re-renders in rAF loop
  const currentValues = useRef({
    rainbowY: 120,
    leftCloudX: -200,
    rightCloudX: 200,
    cloudY: 0,
    cloudOpacity: 0,
  });

  useEffect(() => {
    let animationFrameId: number;

    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max);

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // progress from 0 (just entering bottom) to 1 (just leaving top)
      const progress = clamp(
        (windowHeight - rect.top) / (windowHeight + rect.height),
        0,
        1
      );

      // 1. Rainbow Target (+120px to -160px)
      const targetRainbowY = 120 - 280 * progress;

      // 2. Cloud Targets (in view between progress 0.12 and 0.92)
      const inView = progress >= 0.12 && progress <= 0.92;
      const targetLeftCloudX = inView ? 0 : -200;
      const targetRightCloudX = inView ? 0 : 200;
      const targetCloudY = progress * -50;
      const targetCloudOpacity = inView ? 1 : 0;

      // Lerp smoothing
      const cur = currentValues.current;
      cur.rainbowY = lerp(cur.rainbowY, targetRainbowY, 0.06);
      cur.leftCloudX = lerp(cur.leftCloudX, targetLeftCloudX, 0.04);
      cur.rightCloudX = lerp(cur.rightCloudX, targetRightCloudX, 0.04);
      cur.cloudY = lerp(cur.cloudY, targetCloudY, 0.04);
      cur.cloudOpacity = lerp(cur.cloudOpacity, targetCloudOpacity, 0.04);

      // Apply DOM styles directly via translate3d for GPU acceleration
      if (rainbowRef.current) {
        rainbowRef.current.style.transform = `translate3d(0, ${cur.rainbowY}px, 0)`;
      }

      if (leftCloudRef.current) {
        leftCloudRef.current.style.transform = `translate3d(${cur.leftCloudX}px, ${cur.cloudY}px, 0)`;
        leftCloudRef.current.style.opacity = cur.cloudOpacity.toFixed(3);
      }

      if (rightCloudRef.current) {
        // Remember right cloud is scale-x-[-1] (flipped horizontally)
        rightCloudRef.current.style.transform = `translate3d(${cur.rightCloudX}px, ${cur.cloudY}px, 0) scaleX(-1)`;
        rightCloudRef.current.style.opacity = cur.cloudOpacity.toFixed(3);
      }

      animationFrameId = requestAnimationFrame(handleScroll);
    };

    animationFrameId = requestAnimationFrame(handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center px-6 md:px-12"
      style={{
        background: 'linear-gradient(180deg, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
    >
      {/* 1. Rainbow Image */}
      <img
        ref={rainbowRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png"
        alt="Rainbow atmospheric glow"
        className="absolute inset-x-0 top-0 w-full object-cover z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, 120px, 0)' }}
      />

      {/* 2. Left Cloud */}
      <img
        ref={leftCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Left cloud"
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 w-[500px] md:w-[650px] pointer-events-none will-change-transform"
        style={{
          marginLeft: '-50%',
          transform: 'translate3d(-200px, 0, 0)',
          opacity: 0,
        }}
      />

      {/* 3. Right Cloud (Flipped) */}
      <img
        ref={rightCloudRef}
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png"
        alt="Right cloud"
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 w-[500px] md:w-[650px] pointer-events-none will-change-transform"
        style={{
          marginRight: '-75%',
          transform: 'translate3d(200px, 0, 0) scaleX(-1)',
          opacity: 0,
        }}
      />

      {/* 4. Quote Content */}
      <div className="relative z-20 max-w-4xl text-center px-4">
        <blockquote className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5] font-normal">
          &ldquo;Serene was founded on a belief in beauty that honors your nature. We pursue refined outcomes, considered approaches, and lasting vitality. We spend time learning what matters to you before deciding what serves you best. No rushing, no excess &mdash; just support that lets you feel radiant.&rdquo;
        </blockquote>
        <div className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide font-inter">
          Dr. Mia Callahan &mdash; Founder
        </div>
      </div>
    </section>
  );
};

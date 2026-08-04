import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function use3DTilt(xDegrees = "15deg", yDegrees = "15deg") {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const finalX = isMobile ? "0deg" : xDegrees;
  const finalY = isMobile ? "0deg" : yDegrees;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [finalX, `-${parseFloat(finalX)}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${parseFloat(finalY)}deg`, finalY]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave, transformStyle: "preserve-3d" };
}

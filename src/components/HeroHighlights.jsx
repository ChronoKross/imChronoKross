import PropTypes from "prop-types";
import { cn } from "../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";

export const HeroHighlight = ({ children, className, containerClassName }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "relative h-[40rem] flex items-center bg-black dark:bg-black justify-center w-full group",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* The gray grid background */}
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 opacity-30 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      {/* The red highlight effect */}
      <motion.div
        className="pointer-events-none bg-dot-thick-red-500 dark:bg-dot-thick-red-500 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />
      <div className={cn("relative z-20", className)}>{children}</div>
    </div>
  );
};

HeroHighlight.propTypes = {
  children: PropTypes.node.isRequired, // children can be any renderable content
  className: PropTypes.string, // className is an optional string
  containerClassName: PropTypes.string, // containerClassName is an optional string
};

export const Highlight = ({ children, className }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 dark:from-indigo-500 dark:to-purple-500`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

Highlight.propTypes = {
  children: PropTypes.node.isRequired, // children can be any renderable content
  className: PropTypes.string, // className is an optional string
};

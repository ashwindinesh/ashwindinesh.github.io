/**
 * Remotion Reference — Hero Text Animation
 *
 * Staggered entrance: 3 lines animate in with translateY + opacity
 * using spring({ damping: 200 }) for smooth, no-bounce motion.
 *
 * At 30fps, total duration ≈ 24 frames (800ms).
 *
 * This is a reference file — the actual site uses the equivalent
 * CSS @keyframes version in index.html.
 */
import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";

const STAGGER_FRAMES = 4; // ~133ms between each line at 30fps
const TRANSLATE_DISTANCE = 24; // pixels to travel upward

const AnimatedLine: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth spring, no bounce — matches Remotion best-practice "smooth" config
  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 16, // ~530ms at 30fps
  });

  const opacity = progress;
  const translateY = interpolate(progress, [0, 1], [TRANSLATE_DISTANCE, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const HeroAnimation: React.FC = () => {
  const { fps } = useVideoConfig();

  const lines = [
    {
      text: "Ashwin Dinesh,",
      style: {
        fontSize: 80,
        fontWeight: 600,
        letterSpacing: "-0.035em",
        lineHeight: 1.12,
      } as React.CSSProperties,
    },
    {
      text: "Product Design Architect.",
      style: {
        fontSize: 48,
        fontWeight: 600,
        letterSpacing: "-0.035em",
        lineHeight: 1.12,
      } as React.CSSProperties,
    },
    {
      text: "Design leader with 18+ years of experience shaping global digital products across consumer and enterprise platforms. Currently at Tekion Corp.",
      style: {
        fontSize: 24,
        color: "#6b7280",
        lineHeight: 1.5,
      } as React.CSSProperties,
    },
  ];

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {lines.map((line, index) => (
        <Sequence
          key={index}
          from={index * STAGGER_FRAMES}
          layout="none"
          premountFor={Math.ceil(fps * 0.5)}
        >
          <AnimatedLine style={line.style}>{line.text}</AnimatedLine>
        </Sequence>
      ))}
    </div>
  );
};

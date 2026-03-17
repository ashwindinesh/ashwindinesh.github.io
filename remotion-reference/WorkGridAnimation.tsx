/**
 * Remotion Reference — Work Grid Staggered Reveal
 *
 * Uses TransitionSeries with fade() for staggered card entrances,
 * and spring({ damping: 200 }) for smooth translateY + opacity.
 *
 * The actual site uses IntersectionObserver + CSS transitions
 * to achieve the same effect without a build step.
 */
import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const STAGGER_FRAMES = 4; // ~133ms at 30fps
const CARD_ENTRANCE_DURATION = 18; // ~600ms at 30fps
const TRANSLATE_DISTANCE = 20;

interface CardProps {
  title: string;
  imageUrl: string;
}

const AnimatedCard: React.FC<CardProps> = ({ title, imageUrl }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: CARD_ENTRANCE_DURATION,
  });

  const opacity = progress;
  const translateY = interpolate(progress, [0, 1], [TRANSLATE_DISTANCE, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: "#f3f4f6",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <p style={{ padding: "11px 14px", fontSize: 13, fontWeight: 500 }}>
        {title}
      </p>
    </div>
  );
};

const cards: CardProps[] = [
  {
    title: "Date selection",
    imageUrl: "https://cdn.dribbble.com/userupload/21562034/file/still-83021ab93fb38d788fd583a9d97624f4.gif",
  },
  {
    title: "Shopping Filter UX",
    imageUrl: "https://cdn.dribbble.com/userupload/21273904/file/still-d3725e7e31292f312cc70f53b3036a47.gif",
  },
  {
    title: "Bo&play Web Concept",
    imageUrl: "https://cdn.dribbble.com/userupload/42771652/file/still-b919cb6e3eeb19184fcc502b25760970.png",
  },
  {
    title: "Day 002",
    imageUrl: "https://cdn.dribbble.com/userupload/21659255/file/original-4685f671b22e84094b7e5d9779ea3ee2.png",
  },
];

export const WorkGridAnimation: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px 28px",
      }}
    >
      {cards.map((card, index) => (
        <Sequence
          key={index}
          from={index * STAGGER_FRAMES}
          layout="none"
          premountFor={Math.ceil(fps * 0.5)}
        >
          <AnimatedCard {...card} />
        </Sequence>
      ))}
    </div>
  );
};

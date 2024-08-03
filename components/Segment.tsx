import { cn } from "@/utils/cn";
import React from "react";

function Segment({
  lit,
  rotation,
  position,
}: {
  lit: boolean;
  rotation: number;
  position: { left: number; top: number };
}) {
  return (
    <div
      className={cn(
        `w-segmentWidth h-segmentHeight absolute origin-left transition-all bg-unlit before:content-[''] before:absolute before:top-0 before:w-1/5 before:h-full before:bg-inherit before:left-full before:rotate-90 before:before-after-segment after:content-[''] after:absolute after:top-0 after:w-1/5 after:h-full after:bg-inherit after:right-full after:-rotate-90 after:before-after-segment`,
        lit ? "bg-lit" : "bg-white/10",
        rotation && `rotate-${rotation}`
      )}
      style={{
        left: `${position.left}rem`,
        top: `${position.top}rem`,
      }}
    ></div>
  );
}

export default function Display({ input }: { input: string | number }) {
  // this is the height of the segment
  const offset = 0.625;

  const segments: number[] = [];
  for (let i = 0; i < 7; i++) {
    segments.push(i);
  }

  const map: { [key: string | number]: number } = {
    0: 0x3f,
    1: 0x06,
    2: 0x5b,
    3: 0x4f,
    4: 0x66,
    5: 0x6d,
    6: 0x7d,
    7: 0x07,
    8: 0x7f,
    9: 0x67,
    A: 0x77,
    B: 0x7c,
    C: 0x39,
    D: 0x5e,
    E: 0x79,
    F: 0x71,
    G: 0x3d,
    H: 0x76,
    I: 0x06,
    J: 0xd,
    L: 0x38,
    N: 0x54,
    O: 0x3f,
    P: 0x73,
    Q: 0x67,
    R: 0x50,
    S: 0x6d,
    T: 0x78,
    U: 0x1c,
    Y: 0x66,
    " ": 0,
  };

  return (
    <div className="relative">
      {segments.map((segment) => {
        // bitwise operation to get the segment from the input number
        const output = !map[input] ? false : !!((map[input] >> segment) & 1);

        let left;
        if (segment % 3 === 0) {
          // this covers the top, middle, and bottom
          left = offset;
        } else if (segment === 1 || segment === 2) {
          // this covers the two right segments
          left = 7 * offset;
        } else {
          // this covers the two left segments
          left = 0;
        }

        let top;
        if (segment === 0) {
          top = 0;
        } else if (segment === 1 || segment === 5) {
          top = offset;
        } else if (segment === 2 || segment === 4) {
          top = 8 * offset;
        } else if (segment === 6) {
          top = 7 * offset;
        } else {
          top = 14 * offset;
        }

        const rotation = [1, 2, 4, 5].includes(segment) ? 90 : 0;
        return (
          <Segment
            key={segment}
            lit={output}
            rotation={rotation}
            position={{ left, top }}
          />
        );
      })}
    </div>
  );
}

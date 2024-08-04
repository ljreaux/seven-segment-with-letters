import { cn } from "@/utils/cn";
import React from "react";

function Segment({
  lit,
  rotation,
  position,
  short,
}: {
  lit: boolean;
  rotation: number;
  position: { left: number; top: number };
  short?: boolean;
}) {
  const angled = rotation ? Math.abs(rotation) === 30 : false;
  return (
    <div
      className={cn(
        `h-segmentHeight absolute origin-left transition-all bg-unlit before:content-[''] before:absolute before:top-0 before:w-segmentHeight before:h-full before:bg-inherit before:left-full before:rotate-90 before:before-after-segment after:content-[''] after:absolute after:top-0 after:w-segmentHeight after:h-full after:bg-inherit after:right-full after:-rotate-90 after:before-after-segment`,
        lit ? "bg-lit" : "bg-unlit",
        rotation &&
          (rotation < 0 ? `-rotate-${-rotation}` : `rotate-${rotation}`),
        short ? `w-halfSegment` : "w-segmentWidth",
        angled && "-z-10"
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
  for (let i = 0; i < 16; i++) {
    segments.push(i);
  }

  const map: { [key: string | number]: number } = {
    // integers
    0: 0xff,
    1: 0xc,
    2: 0x377,
    3: 0x33f,
    4: 0x38c,
    5: 0x3bb,
    6: 0x3fb,
    7: 0xf,
    8: 0x3ff,
    9: 0x3bf,

    // uppercase letters
    A: 0x3cf,
    B: 0x4a3f,
    C: 0xf3,
    D: 0x483f,
    E: 0x3f3,
    F: 0x3c3,
    G: 0x2fb,
    H: 0x3cc,
    I: 0x4833,
    J: 0x4863,
    K: 0x91c0,
    L: 0xf0,
    M: 0x54cc,
    N: 0x84cc,
    O: 0xff,
    P: 0x3c7,
    Q: 0x80ff,
    R: 0x83c7,
    S: 0x3bb,
    T: 0x4803,
    U: 0xfc,
    V: 0x30c0,
    W: 0xa8cc,
    X: 0xb400,
    Y: 0x4384,
    Z: 0x3033,

    // lowercase letters
    a: 0x37f,
    b: 0x3f8,
    c: 0x370,
    d: 0x37c,
    e: 0x3f7,
    f: 0x4b02,
    g: 0x3bf,
    h: 0x3c8,
    i: 0x4131,
    j: 0x3b,
    k: 0x83c0,
    l: 0x4811,
    m: 0x4348,
    n: 0xcf,
    o: 0x378,
    p: 0x11c3,
    q: 0x118f,
    r: 0x340,
    s: 0x8230,
    t: 0x4b10,
    u: 0x78,
    v: 0x2040,
    w: 0xa048,
    x: 0xa300,
    y: 0xa3c,
    z: 0x2120,

    // special characters
    " ": 0,
  };

  return (
    <div className="relative w-32 h-40 flex items-center justify-center m-4">
      {segments.map((segment) => {
        // bitwise operation to get the segment from the input number
        const output = !map[input] ? false : !!((map[input] >> segment) & 1);

        let left;
        if ([0, 5, 8, 10, 13].includes(segment)) {
          // this covers the top, middle, and bottom
          left = offset;
        } else if ([1, 4, 9, 12, 15].includes(segment)) {
          left = 5.5 * offset;
        } else if ([2, 3].includes(segment)) {
          // this covers the two right segments
          left = 9 * offset;
        } else if ([11, 14].includes(segment)) {
          // this covers the two right segments
          left = 4.5 * offset;
        } else {
          // this covers the two left segments
          left = 0;
        }

        let top;
        if ([0, 1].includes(segment)) {
          top = 0;
        } else if ([3, 6, 14].includes(segment)) {
          top = 8 * offset;
        } else if ([8, 9].includes(segment)) {
          top = 7 * offset;
        } else if ([2, 7, 11].includes(segment)) {
          top = offset;
        } else if (segment === 10) {
          // this covers the two right segments
          top = 1.25 * offset;
        } else if (segment === 12) {
          // this covers the two right segments
          top = (5 + offset) * offset;
        } else if (segment === 13) {
          // this covers the two right segments
          top = (12 + offset) * offset;
        } else if (segment === 15) {
          top = 8.25 * offset;
        } else {
          top = 14 * offset;
        }

        const rotation = [2, 3, 6, 7, 11, 14].includes(segment)
          ? 90
          : [12, 13].includes(segment)
          ? -30
          : [10, 15].includes(segment)
          ? 30
          : 0;
        return (
          <Segment
            key={segment}
            lit={output}
            rotation={rotation}
            position={{ left, top }}
            short={[0, 1, 4, 5, 8, 9].includes(segment)}
          />
        );
      })}
    </div>
  );
}

export const SixteenSegmentText = ({ text }: { text: string }) => {
  const displayMap = text.split("");
  return displayMap.map((char) => {
    return <Display input={char} key={char} />;
  });
};

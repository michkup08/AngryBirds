import { Group, ImageShader, Circle as SkiaCircle, useImage } from '@shopify/react-native-skia';
import React from 'react';

type Props = {
  x: number;
  y: number;
  r: number;
  angle?: number; // dodajemy kąt rotacji
};

export default function Pig({ x, y, r, angle = 0 }: Props) {
  const pigImage = useImage(require("@/assets/images/pig.png"));
  if (!pigImage) return null;

  return (
    <Group
      transform={[
        { translateX: x },
        { translateY: y },
        { rotate: angle },
      ]}
    >
      <SkiaCircle cx={0} cy={0} r={r}>
        <ImageShader
          image={pigImage}
          fit="cover"
          rect={{ x: -r, y: -r, width: r * 2, height: r * 2 }}
        />
      </SkiaCircle>
    </Group>
  );
}

import { Rect as SkiaRect } from '@shopify/react-native-skia';
import React from 'react';

type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
  angle?: number;
};

export default function Block({ x, y, w, h, angle = 0 }: Props) {
  return (
    <SkiaRect
      x={x - w / 2}
      y={y - h / 2}
      width={w}
      height={h}
      color="brown"
    />
  );
}

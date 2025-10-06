import { Circle as SkiaCircle } from '@shopify/react-native-skia';
import React from 'react';

type Props = {
  x: number;
  y: number;
  r: number;
};

export default function Pig({ x, y, r }: Props) {
  return <SkiaCircle cx={x} cy={y} r={r} color="green" />;
}

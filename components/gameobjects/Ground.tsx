import { Group, ImageShader, Rect as SkiaRect, useImage } from "@shopify/react-native-skia";
import React from "react";

type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function Ground({ x, y, w, h }: Props) {
  const image = useImage(require("@/assets/images/box.png"));
  if (!image) return null;

  return (
    <Group transform={[{ translateX: x }, { translateY: y }]}>
      <SkiaRect x={-w / 2} y={-h / 2} width={w} height={h}>
        <ImageShader
          image={image}
          fit="cover"
          rect={{ x: -w / 2, y: -h / 2, width: w, height: h }}
        />
      </SkiaRect>
    </Group>
  );
}

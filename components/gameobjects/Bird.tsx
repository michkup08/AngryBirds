import { Group, ImageShader, Circle as SkiaCircle, useImage } from "@shopify/react-native-skia";
import React from "react";

type Props = {
  x: number;
  y: number;
  r: number;
  angle?: number;
};

export default function Bird({ x, y, r, angle = 0 }: Props) {
  const image = useImage(require("@/assets/images/player.png"));
  if (!image) return null;

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
          image={image}
          fit="cover"
          rect={{ x: -r, y: -r, width: r * 2, height: r * 2 }}
        />
      </SkiaCircle>
    </Group>
  );
}

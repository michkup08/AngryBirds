import { Circle, Group, Rect } from '@shopify/react-native-skia';
import React from 'react';
import { BodySnapshot } from './types';

type Props = {
  bodies: BodySnapshot[];
};

export default function SkiaRenderer({ bodies }: Props) {
  return (
    <Group>
      {bodies.map((b) => {
        // jeśli ciało jest kołem (ptak lub świnia)
        if (b.circleRadius) {
          const color =
            b.label === 'bird'
              ? 'brown'
              : b.label === 'pig'
              ? 'green'
              : 'gray';
          return (
            <Circle
              key={String(b.id)}
              cx={b.position.x}
              cy={b.position.y}
              r={b.circleRadius}
              color={color}
            />
          );
        }

        // jeśli ciało jest prostokątem (blok / podłoże)
        const w = (b as any).width ?? Math.max(1, b.bounds!.max.x - b.bounds!.min.x);
        const h = (b as any).height ?? Math.max(1, b.bounds!.max.y - b.bounds!.min.y);
        const color = b.label === 'Ground' ? 'black' : 'gray';

        return (
          <Group
            key={String(b.id)}
            transform={[
              { translateX: b.position.x },
              { translateY: b.position.y },
              { rotate: b.angle }, // obrót wokół środka
            ]}
          >
            <Rect
              x={-w / 2}
              y={-h / 2}
              width={w}
              height={h}
              color={color}
            />
          </Group>
        );
      })}
    </Group>
  );
}

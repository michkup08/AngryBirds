import Bird from '@/components/gameobjects/Bird';
import Block from '@/components/gameobjects/Block';
import Ground from '@/components/gameobjects/Ground';
import Pig from '@/components/gameobjects/Pig';
import { Group } from '@shopify/react-native-skia';
import React from 'react';
import { BodySnapshot } from './types';

type Props = {
  bodies: BodySnapshot[];
};

export default function SkiaRenderer({ bodies }: Props) {
  // useEffect(() => {
    // console.log('Bodies updated:', bodies);
  // }, [bodies]);
  return (
    <Group>
      {bodies.map((b) => {
        // jeśli ciało jest kołem (ptak lub świnia)
        if (b.circleRadius) {
          
          if( b.label === 'Bird')
          {
            return (
              <Bird
                key={String(b.id)}
                x={b.position.x}
                y={b.position.y}
                r={b.circleRadius}
                // angle={b.angle}
              />
            );
          } else //if (b.label === 'pig')
          {
            return (
              <Pig
                key={String(b.id)}
                x={b.position.x}
                y={b.position.y}
                r={b.circleRadius}
                angle={b.angle}
              />
            );
          }
        }

        // jeśli ciało jest prostokątem (blok / podłoże)
        const w = (b as any).width ?? Math.max(1, b.bounds!.max.x - b.bounds!.min.x);
        const h = (b as any).height ?? Math.max(1, b.bounds!.max.y - b.bounds!.min.y);
        if(b.label === 'Ground') {
          return (
            <Ground
              key={String(b.id)}
              x={b.position.x}
              y={b.position.y}
              w={w}
              h={h}
            />
          )
        }

        return (
          <Block
            key={String(b.id)}
            x={b.position.x}
            y={b.position.y}
            w={w}
            h={h}
            angle={b.angle}
          />
        );
      })}
    </Group>
  );
}

import { Circle, Group, Rect } from '@shopify/react-native-skia';
import React, { JSX } from 'react';
import { BodySnapshot } from './types';


type Props = {
    bodies: BodySnapshot[];
};


export default function SkiaRenderer({ bodies }: Props): JSX.Element {
    return (
        <Group>
            {bodies.map((b) => {
                if (b.circleRadius) {
                    return <Circle key={String(b.id)} cx={b.position.x} cy={b.position.y} r={b.circleRadius} />;
                }
                const w = Math.max(1, (b.bounds!.max.x - b.bounds!.min.x));
                const h = Math.max(1, (b.bounds!.max.y - b.bounds!.min.y));
                return <Rect key={String(b.id)} x={b.position.x - w / 2} y={b.position.y - h / 2} width={w} height={h} />;
            })}
        </Group>
    );
}
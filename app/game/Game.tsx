import SlingshotGesture from '@/components/gesture/SlingshotGesture';
import level1 from '@/levels/level1.json';
import { Canvas } from '@shopify/react-native-skia';
import React, { JSX, useEffect, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import PhysicsEngine from '../engine/PhisicsEngine';
import SkiaRenderer from '../engine/SkiaRenderer';
import { BodySnapshot } from '../engine/types';

const { width, height } = Dimensions.get('window');


export default function GameScreen(): JSX.Element {
    const physics = useRef<PhysicsEngine | null>(null);
    const [bodies, setBodies] = useState<BodySnapshot[]>([]);
    const [currentBird, setCurrentBird] = useState<number | null>(null);
    const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        physics.current = new PhysicsEngine((snapshot) => {
            setBodies(snapshot.bodies);
        });
        physics.current.init();

        // Spawn z level1.json
        level1.blocks.forEach((b) =>
            physics.current?.addBlock(b.x, b.y, b.w, b.h, b.hp)
        );
        level1.pigs.forEach((p) =>
            physics.current?.addPig(p.x, p.y, p.r, p.hp)
        );
        const birds = level1.birds.map((b) =>
            physics.current?.addBird(b.x, b.y, b.r)
        );

        // ustaw pierwszego ptaka jako aktualny
        if (birds.length > 0 && birds[0]) {
            setCurrentBird(birds[0].id);
        }

        return () => {
            physics.current?.stop();
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Canvas style={{ width, height }}>
                <SkiaRenderer bodies={bodies} />
            </Canvas>
            {currentBird && physics.current && (
                <SlingshotGesture birdId={currentBird} physics={physics.current} onDrag={setDragPos} />
            )}
        </View>
    );
}
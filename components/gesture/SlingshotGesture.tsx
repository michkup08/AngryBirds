import PhysicsEngine from '@/app/engine/PhisicsEngine';
import { Body } from 'matter-js';
import React, { useRef } from 'react';
import { Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState, View } from 'react-native';

type Props = {
  birdId: number;
  physics: PhysicsEngine;
  onDrag?: (pos: { x: number; y: number } | null) => void; // callback dla Canvasu
};

const { width, height } = Dimensions.get('window');

const SlingshotGesture = ({ birdId, physics, onDrag }: Props) => {
    const anchor = { 
        x: width * 0.15, 
        y: height * 0.7 
    }; 
    const dragPos = useRef<{ x: number; y: number } | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
        dragPos.current = {
          x: anchor.x + gesture.dx,
          y: anchor.y + gesture.dy,
        };
        onDrag?.(dragPos.current);
      },
      onPanResponderRelease: () => {
        const body = physics.getBodyById(birdId);
        if (body && dragPos.current) {
            const dx = anchor.x - dragPos.current.x;
            const dy = anchor.y - dragPos.current.y;
            Body.setStatic(body, false);
            Body.setPosition(body, { x: anchor.x, y: anchor.y });
            Body.setMass(body, 30);
            Body.setInertia(body, Infinity);
            Body.setVelocity(body, { x: dx * 0.06, y: dy * 0.06 });
            console.log('Bird launched with velocity:', { x: dx * 2, y: dy * 2 });
        }
        dragPos.current = null;
        onDrag?.(null);
      },
    })
  ).current;

  return (
    <View
      {...(panResponder.panHandlers as any)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    />
  );
}

export default SlingshotGesture;

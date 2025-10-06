// import PhysicsEngine from '@/app/engine/PhisicsEngine';
// import { Circle, Line } from '@shopify/react-native-skia';
// import { Body } from 'matter-js';
// import React, { useEffect, useRef } from 'react';
// import { GestureResponderEvent, PanResponder, PanResponderGestureState, View } from 'react-native';

// type Props = {
//   birdId: number;
//   physics: PhysicsEngine;
// };

// export default function Slingshot({ birdId, physics }: Props) {
//   const anchor = { x: 120, y: 600 }; // punkt zaczepienia gumy
//   const dragPos = useRef<{ x: number; y: number } | null>(null);

//   useEffect(() => {
//     console.log('Slingshot mounted with birdId:', birdId);
//   }, [birdId]);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => {
//         console.log('start');
//         return true;
//       },
//       onStartShouldSetPanResponderCapture: () => true,
//       onPanResponderMove: (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
//         console.log('move', gesture.dx, gesture.dy);
//         dragPos.current = {
//           x: anchor.x + gesture.dx,
//           y: anchor.y + gesture.dy,
//         };
//       },
//       onPanResponderRelease: () => {
//         console.log('release');
//         if (!dragPos.current) return;
//           const body = physics.getBodyById(birdId);
//         if (body) {
//           // wektor naciągu
//           const dx = anchor.x - dragPos.current.x;
//           const dy = anchor.y - dragPos.current.y;

//           // nadaj prędkość proporcjonalną do naciągu
//           Body.setStatic(body, false);
//         //   Body.setPosition(body, { x: anchor.x, y: anchor.y });
//           Body.setVelocity(body, { x: dx * 0.0000002, y: dy * 0.0000002 });
//         }
//         dragPos.current = null;
//       },
//     })
//   ).current;

//   // aktualna pozycja końca gumy
//   const endPos = dragPos.current ?? anchor;

//   return (
//     <>
//       {/* gumy procy */}
//       <Line p1={anchor} p2={endPos} color="black" strokeWidth={4} />
//       <Line p1={{ x: anchor.x - 10, y: anchor.y }} p2={endPos} color="black" strokeWidth={4} />
//       {/* punkt zaczepienia */}
//       <Circle cx={anchor.x} cy={anchor.y} r={8} color="brown" />

//       {/* PanResponder potrzebuje View w drzewie */}
//       <View
//         {...(panResponder.panHandlers as any)}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           zIndex: 9999,
//           backgroundColor: 'transparent',
//         }}
//       />
//     </>
//   );
// }

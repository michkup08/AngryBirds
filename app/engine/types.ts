import Matter from 'matter-js';


export type BodySnapshot = {
    id: number;
    position: { x: number; y: number };
    angle: number;
    label?: string;
    circleRadius?: number | null;
    bounds?: Matter.Bounds;
    hp?: number;
};


export type PhysicsUpdateCallback = (bodies: BodySnapshot[]) => void;
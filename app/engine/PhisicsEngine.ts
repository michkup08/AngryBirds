import Matter, { Bodies, Body, Engine, World } from 'matter-js';
import { Dimensions } from 'react-native';
import { BodySnapshot } from './types';

type Snapshot = { bodies: BodySnapshot[] };
const { width, height } = Dimensions.get('window');

export default class PhysicsEngine {
  private engine: Engine;
  private world: World;
  private onUpdate?: (snapshot: Snapshot) => void;
  private _running = false;
  healthMap: Map<number, number> = new Map();

  constructor(onUpdate?: (snapshot: Snapshot) => void) {
    this.engine = Engine.create({ gravity: { x: 0, y: 1 } });
    this.world = this.engine.world;
    this.onUpdate = onUpdate;
  }

  init() {
    this._running = true;

    // dodaj podłogę
    const ground = Bodies.rectangle(width / 2 , height - 20, width , 40, {
      isStatic: true,
      label: 'Ground',
    });
    World.add(this.world, ground);

    this.setupCollisionHandlers();
    this._loop();
  }

  stop() {
    this._running = false;
  }

  private _loop = () => {
    if (!this._running) return;

    Engine.update(this.engine, 1000 / 60);

    const bird = this.world.bodies.find((b) => b.label === "bird");
    if (bird) {
      console.log("bird pos:", bird.position);
    }

    this.world.bodies.forEach((b) => {
      if (b.label === 'bird') {
        b.position.x = Math.min(800, Math.max(0, b.position.x));
        b.position.y = Math.min(800, Math.max(0, b.position.y));
        const speed = Math.sqrt(b.velocity.x ** 2 + b.velocity.y ** 2);
        if (speed > 40) {
          Body.setVelocity(b, {
            x: b.velocity.x * 0.8,
            y: b.velocity.y * 0.8,
          });
        }
      }
    });


    const bodies: BodySnapshot[] = this.world.bodies.map((b) => ({
      id: b.id,
      position: { x: b.position.x, y: b.position.y },
      angle: b.angle,
      label: b.label,
      circleRadius: (b as any).circleRadius ?? null,
      bounds: b.bounds,
      width: (b as any).width ?? null,
      height: (b as any).height ?? null,
      hp: this.healthMap.get(b.id),
    }));

    this.onUpdate?.({ bodies });

    requestAnimationFrame(this._loop);
  };

  addBlock(x: number, y: number, w: number, h: number, hp = 30) {
    const block = Bodies.rectangle(x, y, w, h, {
      label: 'Block',
      restitution: 0.2,
      friction: 0.8,
      density: 0.005,
      frictionAir: 0.02,
    });
    (block as any).width = w;
    (block as any).height = h;
    Body.setInertia(block, block.inertia);
    World.add(this.world, block);
    this.healthMap.set(block.id, hp);
    return block;
  }

  addPig(x: number, y: number, r: number, hp = 20) {
    const pig = Bodies.circle(x, y, r, { label: 'Pig', restitution: 0.4 });
    World.add(this.world, pig);
    this.healthMap.set(pig.id, hp);
    return pig;
  }

  addBird(x: number, y: number, r: number) {
    const bird = Bodies.circle(x, y, r, {
        label: 'Bird',
        isStatic: true,
        density: 0.004,
        restitution: 0.3,
    });
    World.add(this.world, bird);
    return bird;
  }

  getBodyById(id: number): Body | undefined {
    return this.world.bodies.find((b) => b.id === id);
  }

  private setupCollisionHandlers() {
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair as any;
        const impact = (bodyA.speed || 0) + (bodyB.speed || 0);

        [bodyA, bodyB].forEach((body: Matter.Body) => {
          const id = body.id;
          if (this.healthMap.has(id)) {
            const prev = this.healthMap.get(id) ?? 0;
            const damage = Math.min(prev, Math.round(impact * 5));
            const next = Math.max(0, prev - damage);
            this.healthMap.set(id, next);

            if (next <= 0) {
              World.remove(this.world, body);
              this.healthMap.delete(id);
            }
          }
        });
      });
    });
  }
}
